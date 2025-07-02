const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
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
  medicalHistory: { type: String },
  allergies: { type: String }
});

// Create models
const User = mongoose.model('User', userSchema);
const Patient = mongoose.model('Patient', patientSchema);

async function testPhoneDuplicate() {
  try {
    const testPhone = '03087876726';
    
    console.log('Testing phone number duplicate checking...');
    console.log('Test phone number:', testPhone);
    
    // Check if phone number already exists
    const existingUserByPhone = await User.findOne({ phoneNumber: testPhone });
    if (existingUserByPhone) {
      console.log('✅ Phone number duplicate check works: User already exists with phone number:', testPhone);
      console.log('User details:', {
        id: existingUserByPhone._id,
        name: existingUserByPhone.firstName + ' ' + existingUserByPhone.lastName,
        email: existingUserByPhone.email,
        role: existingUserByPhone.role
      });
    } else {
      console.log('ℹ️  No existing user found with this phone number');
    }
    
    // Test creating a new user with the same phone number
    console.log('\nTesting creation of new user with same phone number...');
    
    const hashedPassword = await bcrypt.hash('testpassword123', 10);
    
    const newUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      phoneNumber: testPhone,
      address: 'Test Address',
      role: 'patient'
    });
    
    try {
      await newUser.save();
      console.log('❌ Unexpected: User was created successfully (should have failed)');
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.phoneNumber) {
        console.log('✅ MongoDB duplicate key error caught correctly for phone number');
        console.log('Error details:', {
          code: error.code,
          keyPattern: error.keyPattern,
          keyValue: error.keyValue
        });
      } else {
        console.log('❌ Unexpected error:', error);
      }
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nTest completed. Database connection closed.');
  }
}

// Run the test
testPhoneDuplicate(); 