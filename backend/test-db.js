const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/medconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Get all collections
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('\nAll Collections:', collections.map(c => c.name));
  
  // Check users collection
  const users = await mongoose.connection.db.collection('users').find({}).toArray();
  console.log('\nUsers Collection:');
  console.log(JSON.stringify(users, null, 2));
  
  // Check patients collection
  const patients = await mongoose.connection.db.collection('patients').find({}).toArray();
  console.log('\nPatients Collection:');
  console.log(JSON.stringify(patients, null, 2));
  
  // Check doctors collection
  const doctors = await mongoose.connection.db.collection('doctors').find({}).toArray();
  console.log('\nDoctors Collection:');
  console.log(JSON.stringify(doctors, null, 2));
  
  mongoose.connection.close();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 