"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
const PatientSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    medicalHistory: [String],
    allergies: [String],
}, {
    timestamps: true,
});
// Create a compound index for firstName and lastName
PatientSchema.index({ firstName: 1, lastName: 1 });
exports.Patient = User_1.User.discriminator('Patient', PatientSchema);
