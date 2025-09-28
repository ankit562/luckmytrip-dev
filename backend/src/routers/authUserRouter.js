import express from 'express';
import {
  Register,
  VerifyEmail,
  Login,
  RefreshToken,
  Logout,
  GetProfile,
  UpdateProfile,
  ForgotPassword,
  ForgotPasswordRequest,   
} from '../controllers/authUserController.js';

import { authMiddleware } from '../middleware/authUserMiddleware.js';

const router = express.Router();

router.route("/register").post(Register);
router.route("/verify-email").post(VerifyEmail);
router.route("/login").post(Login);
router.route("/refresh-token").post(RefreshToken);
router.route("/logout").post(authMiddleware(), Logout);
router.route("/getprofile").post(authMiddleware(), GetProfile);
router.route("/update-profile").patch(authMiddleware(), UpdateProfile);
router.route("/update-password").patch(authMiddleware(), ForgotPassword);
router.route("/forgot-password").post(ForgotPasswordRequest);


export default router;
