import {
  Client,
  Admin,
  ContentCreator,
  SuperAdmin,
} from "../models/authUserModel.js";

import bcrypt from "bcrypt";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../lib/jsonWebToken.js";

import { sendVerificationEmail, sendForgotPasswordEmail } from "../lib/emailService.js"; // Adjust path

// Helper to resolve mongoose model for given role
const getModelByRole = (role) => {
  switch (role) {
    case "client":
      return Client;
    case "admin":
      return Admin;
    case "content_creator":
      return ContentCreator;
    case "superadmin":
      return SuperAdmin;
    default:
      return Client;
  }
};

// Register client user with OTP generation & email verification token
export const Register = async (req, res) => {
  try {
    const {
      fullName, email, password, phone,
    } = req.body;

    if (!(fullName && email && password && phone)) {
      return res.status(400).send("All inputs are required");
    }

    const existedUser = await Client.findOne({ $or: [{ email }, { phone }] });
    if (existedUser) {
      return res.status(400).send("User with email or phone already exists");
    }

    const user = new Client({
      fullName,
      email,
      password,
      phone,
      isVerified: false,
    });

    const otp = user.generateOTP();

    await user.save();

    // Send OTP email
    await sendVerificationEmail(email, otp);
    
 
    return res.status(201).json({
      message: "Registered successfully. OTP sent to email for verification.",
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Verify user email with OTP
export const VerifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Client.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    if (user.isVerified) return res.status(400).send("User already verified");
    if (user.verifyToken !== otp) return res.status(400).send("Invalid OTP");
    if (user.verifyTokenExpiry < Date.now()) return res.status(400).send("OTP expired");

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed", error: error.message });
  }
};


// Login user issuing access and refresh tokens, saving refresh token in DB
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("Email and password required");
    }

    const user = await Client.findOne({ email });
    if (!user) return res.status(401).send("Invalid credentials");
    if (!user.isVerified) return res.status(401).send("Email not verified");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    const payload = { userId: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Logged in successfully", accessToken });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

// Extend your authUserController to add forgot password request (to send reset email)
export const ForgotPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).send("Email is required");

    const user = await Client.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const resetToken = user.generateForgotPasswordToken();
    await user.save();

    // Construct your frontend reset URL including token as param
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;

    await sendForgotPasswordEmail(email, resetLink);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send password reset email", error: error.message });
  }
};

// Refresh access token using stored refresh token
export const RefreshToken = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ message: "Refresh token not found" });

    const userData = verifyRefreshToken(token);
    if (!userData) return res.status(403).json({ message: "Invalid refresh token" });

    const user = await Client.findById(userData.userId);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }

    const payload = { userId: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Could not refresh token", error: error.message });
  }
};

// Logout user clearing refresh token cookie and DB field
export const Logout = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    if (token) {
      const userData = verifyRefreshToken(token);
      if (userData) {
        const user = await Client.findById(userData.userId);
        if (user) {
          user.refreshToken = undefined;
          await user.save();
        }
      }
    }

    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

// Get profile data depending on user role
export const GetProfile = async (req, res) => {
  try {
    const Model = getModelByRole(req.user.role);
    const user = await Model.findById(req.user.userId)
      .select("-password -refreshToken -verifyToken -forgotPasswordToken");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Could not get profile", error: error.message });
  }
};

// Update profile except sensitive fields like password and tokens
export const UpdateProfile = async (req, res) => {
  try {
    const Model = getModelByRole(req.user.role);
    const updates = { ...req.body };

    // Remove sensitive updates
    delete updates.password;
    delete updates.refreshToken;
    delete updates.verifyToken;
    delete updates.forgotPasswordToken;

    const updatedUser = await Model.findByIdAndUpdate(req.user.userId, updates, { new: true })
      .select("-password -refreshToken -verifyToken -forgotPasswordToken");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

// Update password with old password verification
export const ForgotPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).send("Provide old and new passwords");

    const Model = getModelByRole(req.user.role);
    const user = await Model.findById(req.user.userId);
    if (!user) return res.status(404).send("User not found");

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).send("Incorrect old password");

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password", error: error.message });
  }
};