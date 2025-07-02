import { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import { Patient } from '../models/Patient';
import { Doctor } from '../models/Doctor';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/emailService';
import { rateLimit } from 'express-rate-limit';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

// Rate limiter for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts. Please try again after 15 minutes.'
});

// Rate limiter for registration attempts
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts
  message: 'Too many registration attempts. Please try again after an hour.'
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role, name, phone, address, ...userData } = req.body;

    // Validate email for doctors
    if (role === 'doctor' && !email) {
      return res.status(400).json({ message: 'Email is required for doctor registration' });
    }

    // Check if phone number already exists
    if (phone) {
      const existingUserByPhone = await User.findOne({ phoneNumber: phone });
      if (existingUserByPhone) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }
    }

    // Check if email exists only if provided
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    }

    // Split name into firstName and lastName
    const nameParts = name ? name.trim().split(' ') : [];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    let newUser;
    if (role === 'patient') {
      newUser = new Patient({
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phone,
        address,
        role,
        dateOfBirth: userData.dateOfBirth || new Date(),
        gender: userData.gender || 'other',
        ...userData,
      });
    } else if (role === 'doctor') {
      newUser = new Doctor({
        firstName,
        lastName,
        email,
        password,
        phoneNumber: phone,
        address,
        role,
        specialization: userData.specialization,
        licenseNumber: userData.licenseNumber,
        yearsOfExperience: userData.yearsOfExperience || 0,
        ...userData,
      });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await newUser.save();

    // Generate verification token and send email only if email is provided
    if (email) {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      newUser.resetPasswordToken = verificationToken;
      newUser.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      await newUser.save();
      if (newUser.email) {
        await sendVerificationEmail(newUser.email, verificationToken);
      }
    }

    res.status(201).json({
      message: 'Registration successful' + (email ? '. Please check your email for verification.' : ''),
      user: {
        id: newUser._id,
        name: `${firstName} ${lastName}`.trim(),
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    // Handle MongoDB duplicate key errors more gracefully
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.phoneNumber) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }
      if (error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      return res.status(400).json({ message: 'User already exists with this information' });
    }
    res.status(500).json({ message: 'Error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
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
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
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
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Error verifying email' });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send reset email
    await sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ message: 'Error requesting password reset' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
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
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
}; 