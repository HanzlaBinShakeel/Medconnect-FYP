"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
const DoctorSchema = new mongoose_1.Schema({
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
    specialization: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
        min: 0,
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
    qualifications: [String],
    availability: {
        days: [String],
        startTime: String,
        endTime: String,
    },
}, {
    timestamps: true,
});
// Create a compound index for firstName and lastName
DoctorSchema.index({ firstName: 1, lastName: 1 });
// Create an index for specialization
DoctorSchema.index({ specialization: 1 });
exports.Doctor = User_1.User.discriminator('Doctor', DoctorSchema);
