"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.generateJWTSecret = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateJWTSecret = () => {
    // Generate a random buffer of 64 bytes (512 bits)
    const secret = crypto_1.default.randomBytes(64).toString('hex');
    console.log('Generated JWT Secret:');
    console.log(secret);
    return secret;
};
exports.generateJWTSecret = generateJWTSecret;
// Generate and export the secret
exports.JWT_SECRET = (0, exports.generateJWTSecret)();
