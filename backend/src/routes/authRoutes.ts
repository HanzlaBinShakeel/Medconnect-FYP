import express from 'express';
import {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
} from '../controllers/authController';
import { validateRequest } from '../middleware/validateRequest';
import { rateLimit } from 'express-rate-limit';
import {
  RegisterDto,
  LoginDto,
  RequestPasswordResetDto,
  ResetPasswordDto,
} from '../dto/auth.dto';

const router = express.Router();

// Rate limiters
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: 'Too many registration attempts, please try again later.',
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many login attempts, please try again later.',
});

const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 requests per hour
  message: 'Too many password reset attempts, please try again later.',
});

// Registration route
router.post('/register', registerLimiter, validateRequest(RegisterDto), register);

// Login route
router.post('/login', loginLimiter, validateRequest(LoginDto), login);

// Email verification route
router.get('/verify-email/:token', verifyEmail);

// Password reset routes
router.post(
  '/request-password-reset',
  resetPasswordLimiter,
  validateRequest(RequestPasswordResetDto),
  requestPasswordReset
);
router.post(
  '/reset-password/:token',
  validateRequest(ResetPasswordDto),
  resetPassword
);

export default router; 