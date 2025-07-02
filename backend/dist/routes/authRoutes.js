"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validateRequest_1 = require("../middleware/validateRequest");
const express_rate_limit_1 = require("express-rate-limit");
const auth_dto_1 = require("../dto/auth.dto");
const router = express_1.default.Router();
// Rate limiters
const registerLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 requests per hour
    message: 'Too many registration attempts, please try again later.',
});
const loginLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per 15 minutes
    message: 'Too many login attempts, please try again later.',
});
const resetPasswordLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests per hour
    message: 'Too many password reset attempts, please try again later.',
});
// Registration route
router.post('/register', registerLimiter, (0, validateRequest_1.validateRequest)(auth_dto_1.RegisterDto), authController_1.register);
// Login route
router.post('/login', loginLimiter, (0, validateRequest_1.validateRequest)(auth_dto_1.LoginDto), authController_1.login);
// Email verification route
router.get('/verify-email/:token', authController_1.verifyEmail);
// Password reset routes
router.post('/request-password-reset', resetPasswordLimiter, (0, validateRequest_1.validateRequest)(auth_dto_1.RequestPasswordResetDto), authController_1.requestPasswordReset);
router.post('/reset-password/:token', (0, validateRequest_1.validateRequest)(auth_dto_1.ResetPasswordDto), authController_1.resetPassword);
exports.default = router;
