import mongoose, { Document, Schema } from 'mongoose';
import { User, IUser } from './User';

export interface IPatient extends IUser {
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  medicalHistory?: string[];
  allergies?: string[];
}

const PatientSchema = new Schema<IPatient>(
  {
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    medicalHistory: [String],
    allergies: [String],
  },
  {
    timestamps: true,
  }
);

// Create a compound index for firstName and lastName
PatientSchema.index({ firstName: 1, lastName: 1 });

export const Patient = User.discriminator<IPatient>('Patient', PatientSchema); 