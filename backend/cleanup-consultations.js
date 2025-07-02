const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Get all doctors
  const doctors = await mongoose.connection.db.collection('doctors').find({}).toArray();
  const doctorIds = doctors.map(d => d._id.toString());
  
  // Get all consultations
  const consultations = await mongoose.connection.db.collection('consultations').find({}).toArray();
  
  // Find consultations with deleted doctors
  const orphanedConsultations = consultations.filter(consultation => 
    !doctorIds.includes(consultation.doctorId.toString())
  );
  
  if (orphanedConsultations.length > 0) {
    console.log(`Found ${orphanedConsultations.length} orphaned consultations`);
    console.log('Deleting orphaned consultations...');
    
    // Delete orphaned consultations
    const result = await mongoose.connection.db.collection('consultations')
      .deleteMany({
        _id: { $in: orphanedConsultations.map(c => c._id) }
      });
    
    console.log(`Deleted ${result.deletedCount} orphaned consultations`);
  } else {
    console.log('No orphaned consultations found');
  }
  
  mongoose.connection.close();
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 