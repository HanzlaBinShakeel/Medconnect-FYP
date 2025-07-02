const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

async function checkDatabaseStructure() {
  try {
    console.log('Checking database structure...\n');
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in database:');
    collections.forEach(col => {
      console.log(`- ${col.name}`);
    });
    
    console.log('\nChecking indexes...\n');
    
    // Check users collection indexes
    try {
      const userIndexes = await mongoose.connection.db.collection('users').indexes();
      console.log('Users collection indexes:');
      userIndexes.forEach(index => {
        console.log(`- ${JSON.stringify(index.key)} (unique: ${index.unique})`);
      });
    } catch (error) {
      console.log('Users collection not found or error accessing indexes');
    }
    
    // Check patients collection indexes
    try {
      const patientIndexes = await mongoose.connection.db.collection('patients').indexes();
      console.log('\nPatients collection indexes:');
      patientIndexes.forEach(index => {
        console.log(`- ${JSON.stringify(index.key)} (unique: ${index.unique})`);
      });
    } catch (error) {
      console.log('Patients collection not found or error accessing indexes');
    }
    
    // Check doctors collection indexes
    try {
      const doctorIndexes = await mongoose.connection.db.collection('doctors').indexes();
      console.log('\nDoctors collection indexes:');
      doctorIndexes.forEach(index => {
        console.log(`- ${JSON.stringify(index.key)} (unique: ${index.unique})`);
      });
    } catch (error) {
      console.log('Doctors collection not found or error accessing indexes');
    }
    
    // Check for documents with userId field
    console.log('\nChecking for documents with userId field...\n');
    
    try {
      const usersWithUserId = await mongoose.connection.db.collection('users').find({ userId: { $exists: true } }).toArray();
      console.log(`Users with userId field: ${usersWithUserId.length}`);
      if (usersWithUserId.length > 0) {
        console.log('Sample user with userId:', usersWithUserId[0]);
      }
    } catch (error) {
      console.log('Error checking users collection for userId field');
    }
    
    try {
      const patientsWithUserId = await mongoose.connection.db.collection('patients').find({ userId: { $exists: true } }).toArray();
      console.log(`Patients with userId field: ${patientsWithUserId.length}`);
      if (patientsWithUserId.length > 0) {
        console.log('Sample patient with userId:', patientsWithUserId[0]);
      }
    } catch (error) {
      console.log('Error checking patients collection for userId field');
    }
    
    try {
      const doctorsWithUserId = await mongoose.connection.db.collection('doctors').find({ userId: { $exists: true } }).toArray();
      console.log(`Doctors with userId field: ${doctorsWithUserId.length}`);
      if (doctorsWithUserId.length > 0) {
        console.log('Sample doctor with userId:', doctorsWithUserId[0]);
      }
    } catch (error) {
      console.log('Error checking doctors collection for userId field');
    }
    
  } catch (error) {
    console.error('Error checking database structure:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the check
checkDatabaseStructure(); 