import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  specialty: {
    type: String,
    required: [true, 'Please provide your specialty'],
    trim: true,
  },
  availability: {
    type: String,
    required: [true, 'Please provide your availability'],
    default: 'Available',
    enum: ['Available', 'Busy', 'Offline'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model if it doesn't exist, otherwise use the existing one
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor; 