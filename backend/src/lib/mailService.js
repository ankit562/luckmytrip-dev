import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';


const smtpUser = process.env.SMTP_USER || "admin@theluckmytrip.com";
const smtpPass = process.env.SMTP_PASS || "DQb@sKqXk8";
const smtpHost = process.env.SMTP_HOST || "209.99.17.56"; // e.g. smtp.gmail.com or smtp.mailtrap.io
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined || 587; // e.g. 587
const smtpSecure = process.env.SMTP_SECURE === 'true'; // true only for port 465
const smtpService = process.env.SMTP_SERVICE || "gmail"; // e.g. 'gmail'
const appName = process.env.APP_NAME || 'LuckMyTrip';

if (!smtpUser || !smtpPass) {
  console.warn('⚠️ Missing SMTP_USER or SMTP_PASS in .env file!');
}

let transporterOptions = {};

if (smtpService) {

  transporterOptions = {
    service: smtpService,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  };
} else if (smtpHost) {
  // Use custom SMTP host
  transporterOptions = {
    host: smtpHost,
    port: smtpPort || 587,
    secure: smtpSecure || false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  };
} else {
  
  transporterOptions = {
    streamTransport: true,
    newline: 'unix',
    buffer: true,
  };
  console.warn('⚠️ No SMTP_SERVICE or SMTP_HOST found. Using in-memory transport.');
}

const transporter = nodemailer.createTransport(transporterOptions);

if (process.env.NODE_ENV !== 'production') {
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email transporter verification failed:', error);
    } else {
      console.log('✅ Email transporter is ready to send messages');
    }
  });
}


async function sendEmail(to, subject, html) {
  try {
    const mailOptions = {
      from: `"${appName}" <${smtpUser}>`,
      to,
      subject,
      html,
      text: html.replace(/<[^>]+>/g, ''), // plain text fallback for spam safety
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('🚨 Error sending email:', error);
    throw error;
  }
}


//  Verification Email (OTP)
export async function sendVerificationEmail(to, otp) {
  const subject = 'Your Email Verification OTP';
  const htmlContent = `
    <h2>Email Verification</h2>
    <p>Your One-Time Password (OTP) is:</p>
    <h1 style="color:#007bff;">${otp}</h1>
    <p>This code will expire in <strong>10 minutes</strong>.</p>
    <p>If you didn’t request this, please ignore this email.</p>
  `;
  return sendEmail(to, subject, htmlContent);
}

//  Forgot Password Email
export async function sendForgotPasswordEmail(to, resetLink) {
  const subject = 'Password Reset Request';
  const htmlContent = `
    <h2>Password Reset</h2>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetLink}" style="background:#007bff;color:white;padding:10px 15px;border-radius:6px;text-decoration:none;">
      Reset Password
    </a>
    <p>If you didn’t request this, you can safely ignore this email.</p>
  `;
  return sendEmail(to, subject, htmlContent);
}

//  Order Confirmation Email
export async function sendOrderConfirmationEmail(userEmail, tickets, orderId) {
  const subject = '🎟️ Your Ticket Purchase Confirmation';
  const htmlContent = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your purchase! Here are your ticket details:</p>
    <h3>Order ID: <span style="color:#007bff;">${orderId}</span></h3>
    <ul>
      ${tickets
        .map(
          (ticket) =>
            `<li><strong>${ticket.name}</strong> — Quantity: ${ticket.quantity} — Price: ₹${ticket.price}</li>`
        )
        .join('')}
    </ul>
    <p>We look forward to seeing you at the event!</p>
  `;
  return sendEmail(userEmail, subject, htmlContent);
}

export { sendEmail };
