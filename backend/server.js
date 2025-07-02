const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();

// Create HTTP server
const server = require('http').createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

// WebSocket connection handling
wss.on('connection', (ws) => {
  clients.add(ws);
  
  ws.on('close', () => {
    clients.delete(ws);
  });
});

// Function to broadcast to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/medconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Base User Schema
const baseUserSchema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: false, default: '' },
  email: { type: String, required: false, unique: true, sparse: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true }
};

// User Schema
const userSchema = new mongoose.Schema({
  ...baseUserSchema,
  role: { type: String, required: true, enum: ['patient', 'doctor'] },
  specialization: { type: String },
  licenseNumber: { type: String },
  yearsOfExperience: { type: Number, default: 0 }
});

// Patient Schema
const patientSchema = new mongoose.Schema({
  ...baseUserSchema,
  role: { type: String, default: 'patient' },
  dateOfBirth: { type: Date, required: true, default: Date.now },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true, default: 'other' },
  medicalHistory: { type: String },
  allergies: { type: String }
});

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  ...baseUserSchema,
  role: { type: String, default: 'doctor' },
  specialization: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  yearsOfExperience: { type: Number, default: 0 },
  qualifications: [String],
  availability: {
    days: [String],
    startTime: String,
    endTime: String
  }
});

// Add email validation for doctors
doctorSchema.path('email').required(true);

// Create models
const User = mongoose.model('User', userSchema);
const Patient = mongoose.model('Patient', patientSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);

// Consultation Schema
const consultationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  notes: { type: String },
  prescription: { type: String }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

// Routes
app.post('/api/patients/register', async (req, res) => {
  try {
    console.log('Received patient registration request:', req.body);
    const { name, password, phone, address, email } = req.body;

    // Validate required fields (email is optional for patients)
    if (!name || !password || !phone || !address) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ message: 'All required fields are missing' });
    }

    // Check if phone number already exists
    const existingUserByPhone = await User.findOne({ phoneNumber: phone });
    if (existingUserByPhone) {
      console.log('User already exists with phone number:', phone);
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    // Check if email exists only if provided and not empty
    if (email && email.trim()) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists with email:', email);
        return res.status(400).json({ message: 'Email already registered' });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new patient (which extends User through discriminator)
    const patient = new Patient({
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      email: email && email.trim() ? email : undefined,
      password: hashedPassword,
      phoneNumber: phone,
      address,
      role: 'patient',
      // Add required fields for Patient model
      dateOfBirth: new Date(), // Default to current date, should be provided by frontend
      gender: 'other' // Default value, should be provided by frontend
    });

    // Save only the patient document
    await patient.save();
    console.log('Patient registered successfully:', patient._id);

    res.status(201).json({
      message: 'Patient registered successfully',
      user: {
        id: patient._id,
        name: patient.firstName + ' ' + patient.lastName,
        email: patient.email,
        role: patient.role
      }
    });
  } catch (error) {
    console.error('Error registering patient:', error);
    // Handle MongoDB duplicate key errors more gracefully
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.phoneNumber) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }
      if (error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      if (error.keyPattern && error.keyPattern.userId) {
        return res.status(400).json({ message: 'User already exists with this information' });
      }
      return res.status(400).json({ message: 'User already exists with this information' });
    }
    res.status(500).json({ message: 'Failed to register patient' });
  }
});

app.post('/api/doctors/register', async (req, res) => {
  try {
    const { name, email, password, phone, specialization, licenseNumber, address, experience } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone || !specialization || !licenseNumber || !address) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Split name into firstName and lastName
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Check if phone number already exists
    const existingUserByPhone = await User.findOne({ phoneNumber: phone });
    if (existingUserByPhone) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    // Check if email exists in users collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered in the system' });
    }

    // Check if email exists in doctors collection
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ error: 'This email is already registered as a doctor' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor (which extends User through discriminator)
    const doctor = new Doctor({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber: phone,
      specialization,
      licenseNumber,
      address,
      role: 'doctor',
      yearsOfExperience: experience !== undefined && experience !== null ? parseInt(experience) : 0
    });

    // Save only the doctor document
    await doctor.save();

    // Create initial consultation entry for the new doctor
    const consultation = new Consultation({
      doctorId: doctor._id,
      status: 'pending'
    });
    await consultation.save();

    // After successful registration, broadcast the new doctor
    broadcast({
      type: 'doctor_added',
      doctor: {
        id: doctor._id.toString(),
        name: `${firstName} ${lastName}`.trim(),
        specialization: doctor.specialization,
        phone: doctor.phoneNumber,
        experience: doctor.yearsOfExperience !== undefined && doctor.yearsOfExperience !== null ? String(doctor.yearsOfExperience) : '0',
        email: doctor.email,
        licenseNumber: doctor.licenseNumber,
        availability: 'Available'
      }
    });

    res.status(201).json({
      message: 'Doctor registered successfully',
      user: {
        id: doctor._id,
        name: `${firstName} ${lastName}`.trim(),
        email: doctor.email,
        role: doctor.role,
        specialization: doctor.specialization,
        phone: doctor.phoneNumber,
        experience: doctor.yearsOfExperience !== undefined && doctor.yearsOfExperience !== null ? String(doctor.yearsOfExperience) : '0',
        licenseNumber: doctor.licenseNumber,
        availability: 'Available'
      }
    });
  } catch (error) {
    console.error('Error registering doctor:', error);
    // Handle MongoDB duplicate key errors more gracefully
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.phoneNumber) {
        return res.status(400).json({ error: 'Phone number already registered' });
      }
      if (error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      if (error.keyPattern && error.keyPattern.userId) {
        return res.status(400).json({ error: 'User already exists with this information' });
      }
      return res.status(400).json({ error: 'User already exists with this information' });
    }
    res.status(500).json({ error: 'Failed to register doctor' });
  }
});

// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    // Get all doctors with their details
    const doctors = await Doctor.find({}, {
      firstName: 1,
      lastName: 1,
      specialization: 1,
      phoneNumber: 1,
      yearsOfExperience: 1,
      email: 1,
      licenseNumber: 1,
      availability: 1,
      _id: 1
    });
    
    // Transform the doctors data to match the expected format
    const formattedDoctors = doctors.map(doctor => ({
      id: doctor._id.toString(),
      name: `${doctor.firstName} ${doctor.lastName}`.trim(),
      specialization: doctor.specialization,
      phone: doctor.phoneNumber,
      experience: doctor.yearsOfExperience !== undefined && doctor.yearsOfExperience !== null ? String(doctor.yearsOfExperience) : '0',
      email: doctor.email,
      licenseNumber: doctor.licenseNumber,
      availability: doctor.availability ? 'Available' : 'Available'
    }));
    
    res.json(formattedDoctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
});

// Add doctor endpoint
app.post('/api/doctors', async (req, res) => {
  try {
    const { name, email, specialization, licenseNumber } = req.body;
    
    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ error: 'Doctor already exists' });
    }

    const doctor = new Doctor({
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      email,
      specialization,
      licenseNumber
    });

    await doctor.save();

    // Send WebSocket message
    broadcast(JSON.stringify({
      type: 'doctor_added',
      doctor: {
        id: doctor._id,
        name: doctor.firstName + ' ' + doctor.lastName,
        email: doctor.email,
        specialization: doctor.specialization,
        licenseNumber: doctor.licenseNumber
      }
    }));

    res.status(201).json(doctor);
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ error: 'Failed to add doctor' });
  }
});

// Delete doctor endpoint
app.delete('/api/doctors/:id', async (req, res) => {
  try {
    const doctorId = req.params.id;
    
    // Find doctor to get email
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Delete from doctors collection
    await Doctor.findByIdAndDelete(doctorId);
    
    // Delete from users collection
    await User.findOneAndDelete({ email: doctor.email });
    
    // Cancel all pending consultations
    await Consultation.updateMany(
      { doctorId, status: 'pending' },
      { status: 'cancelled' }
    );

    // Send WebSocket message
    broadcast({
      type: 'doctor_deleted',
      doctorId: doctorId.toString()
    });

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Failed to delete doctor' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 