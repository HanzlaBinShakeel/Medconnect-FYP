"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = exports.verifyEmail = exports.login = exports.register = exports.registerLimiter = exports.loginLimiter = void 0;
const User_1 = require("../models/User");
const Patient_1 = require("../models/Patient");
const Doctor_1 = require("../models/Doctor");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const emailService_1 = require("../utils/emailService");
const express_rate_limit_1 = require("express-rate-limit");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';
// Rate limiter for login attempts
exports.loginLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts
    message: 'Too many login attempts. Please try again after 15 minutes.'
});
// Rate limiter for registration attempts
exports.registerLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 attempts
    message: 'Too many registration attempts. Please try again after an hour.'
});
const register = async (req, res) => {
    try {
        const { email, password, role, ...userData } = req.body;
        // Check if user already exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        let newUser;
        if (role === 'patient') {
            newUser = new Patient_1.Patient({
                email,
                password,
                role,
                ...userData,
            });
        }
        else if (role === 'doctor') {
            newUser = new Doctor_1.Doctor({
                email,
                password,
                role,
                ...userData,
            });
        }
        else {
            return res.status(400).json({ message: 'Invalid role' });
        }
        await newUser.save();
        // Generate verification token
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        newUser.resetPasswordToken = verificationToken;
        newUser.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await newUser.save();
        // Send verification email
        await (0, emailService_1.sendVerificationEmail)(newUser.email, verificationToken);
        res.status(201).json({
            message: 'Registration successful. Please check your email for verification.',
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(401).json({ message: 'Please verify your email first' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
};
exports.login = login;
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User_1.User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }
        user.isEmailVerified = true;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.json({ message: 'Email verified successfully' });
    }
    catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ message: 'Error verifying email' });
    }
};
exports.verifyEmail = verifyEmail;
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate reset token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
        await user.save();
        // Send reset email
        await (0, emailService_1.sendPasswordResetEmail)(user.email, resetToken);
        res.json({ message: 'Password reset email sent' });
    }
    catch (error) {
        console.error('Password reset request error:', error);
        res.status(500).json({ message: 'Error requesting password reset' });
    }
};
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User_1.User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};
exports.resetPassword = resetPassword;
