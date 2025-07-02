"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = require("mongoose");
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    // Handle Mongoose validation errors
    if (err instanceof mongoose_1.Error.ValidationError) {
        statusCode = 400;
        const errors = Object.values(err.errors).map((val) => val.message);
        message = `Validation Error: ${errors.join(', ')}`;
    }
    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }
    // Handle Mongoose cast errors
    if (err instanceof mongoose_1.Error.CastError) {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token. Please log in again!';
    }
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Your token has expired! Please log in again.';
    }
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
exports.errorHandler = errorHandler;
