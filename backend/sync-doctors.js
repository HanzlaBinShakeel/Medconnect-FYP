const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medconnect';

async function syncDoctors() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
    const Doctor = mongoose.model('Doctor', new mongoose.Schema({}, { strict: false }));

    // Get all users with role 'doctor'
    const doctorUsers = await User.find({ role: 'doctor' });
    console.log(`Found ${doctorUsers.length} doctors in users collection`);

    // Get all doctors in doctors collection
    const existingDoctors = await Doctor.find({});
    console.log(`Found ${existingDoctors.length} doctors in doctors collection`);

    // Create a set of existing doctor emails
    const existingDoctorEmails = new Set(existingDoctors.map(d => d.email));

    // Find doctors that need to be added
    const doctorsToAdd = doctorUsers.filter(user => !existingDoctorEmails.has(user.email));
    console.log(`Found ${doctorsToAdd.length} doctors to add`);

    // Add missing doctors
    if (doctorsToAdd.length > 0) {
      await Doctor.insertMany(doctorsToAdd);
      console.log('Added missing doctors to doctors collection');
    }

    // Find doctors that need to be removed (no longer in users collection)
    const userEmails = new Set(doctorUsers.map(u => u.email));
    const doctorsToRemove = existingDoctors.filter(doc => !userEmails.has(doc.email));
    console.log(`Found ${doctorsToRemove.length} doctors to remove`);

    // Remove doctors that are no longer in users collection
    if (doctorsToRemove.length > 0) {
      await Doctor.deleteMany({ _id: { $in: doctorsToRemove.map(d => d._id) } });
      console.log('Removed doctors that are no longer in users collection');
    }

    console.log('Synchronization completed successfully');
  } catch (error) {
    console.error('Error synchronizing doctors:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

syncDoctors(); 