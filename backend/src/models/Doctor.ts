import mongoose, { Document, Schema } from 'mongoose';
import { User, IUser } from './User';

export interface IDoctor extends IUser {
  specialization: string;
  licenseNumber: string;
  yearsOfExperience: number;
  qualifications: string[];
  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
}

const DoctorSchema = new Schema<IDoctor>(
  {
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
    qualifications: [String],
    availability: {
      days: [String],
      startTime: String,
      endTime: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for firstName and lastName
DoctorSchema.index({ firstName: 1, lastName: 1 });
// Create an index for specialization
DoctorSchema.index({ specialization: 1 });

export const Doctor = User.discriminator<IDoctor>('Doctor', DoctorSchema); 