const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Get all doctors from the doctors collection
    const doctors = await mongoose.connection.db.collection('doctors').find({}).toArray();
    console.log('Total doctors in doctors collection:', doctors.length);
    
    // Get all users with role 'doctor'
    const doctorUsers = await mongoose.connection.db.collection('users').find({ role: 'doctor' }).toArray();
    console.log('Total doctors in users collection:', doctorUsers.length);
    
    // Get all consultations
    const consultations = await mongoose.connection.db.collection('consultations').find({}).toArray();
    console.log('Total consultations:', consultations.length);
    
    // Create a set of valid doctor IDs
    const validDoctorIds = new Set([
      ...doctors.map(d => d._id.toString()),
      ...doctorUsers.map(d => d._id.toString())
    ]);
    
    // Find and delete consultations with invalid doctor IDs
    const invalidConsultations = consultations.filter(c => !validDoctorIds.has(c.doctorId.toString()));
    console.log('Found invalid consultations:', invalidConsultations.length);
    
    if (invalidConsultations.length > 0) {
      const result = await mongoose.connection.db.collection('consultations')
        .deleteMany({
          _id: { $in: invalidConsultations.map(c => c._id) }
        });
      console.log('Deleted invalid consultations:', result.deletedCount);
    }
    
    // Find and delete duplicate doctors
    const doctorEmails = new Set();
    const duplicateDoctors = doctors.filter(doctor => {
      if (doctorEmails.has(doctor.email)) {
        return true;
      }
      doctorEmails.add(doctor.email);
      return false;
    });
    
    if (duplicateDoctors.length > 0) {
      console.log('Found duplicate doctors:', duplicateDoctors.length);
      const result = await mongoose.connection.db.collection('doctors')
        .deleteMany({
          _id: { $in: duplicateDoctors.map(d => d._id) }
        });
      console.log('Deleted duplicate doctors:', result.deletedCount);
    }
    
    // Update consultation status for deleted doctors
    const deletedDoctorIds = new Set(
      doctorUsers
        .filter(du => !doctors.some(d => d._id.toString() === du._id.toString()))
        .map(du => du._id.toString())
    );
    
    if (deletedDoctorIds.size > 0) {
      console.log('Found consultations for deleted doctors:', deletedDoctorIds.size);
      const result = await mongoose.connection.db.collection('consultations')
        .updateMany(
          { doctorId: { $in: Array.from(deletedDoctorIds) } },
          { $set: { status: 'cancelled' } }
        );
      console.log('Updated consultations for deleted doctors:', result.modifiedCount);
    }
    
    console.log('Database cleanup completed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
}); 