const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

async function fixDatabaseConflicts() {
  try {
    console.log('Fixing database conflicts...\n');
    
    // Drop problematic indexes
    console.log('Dropping problematic indexes...\n');
    
    try {
      // Drop userId index from patients collection if it exists
      await mongoose.connection.db.collection('patients').dropIndex('userId_1');
      console.log('✅ Dropped userId_1 index from patients collection');
    } catch (error) {
      console.log('ℹ️  userId_1 index not found in patients collection (or already dropped)');
    }
    
    try {
      // Drop userId index from doctors collection if it exists
      await mongoose.connection.db.collection('doctors').dropIndex('userId_1');
      console.log('✅ Dropped userId_1 index from doctors collection');
    } catch (error) {
      console.log('ℹ️  userId_1 index not found in doctors collection (or already dropped)');
    }
    
    // Remove userId fields from existing documents
    console.log('\nRemoving userId fields from existing documents...\n');
    
    try {
      const result = await mongoose.connection.db.collection('patients').updateMany(
        { userId: { $exists: true } },
        { $unset: { userId: "" } }
      );
      console.log(`✅ Removed userId field from ${result.modifiedCount} patient documents`);
    } catch (error) {
      console.log('ℹ️  No patient documents with userId field found');
    }
    
    try {
      const result = await mongoose.connection.db.collection('doctors').updateMany(
        { userId: { $exists: true } },
        { $unset: { userId: "" } }
      );
      console.log(`✅ Removed userId field from ${result.modifiedCount} doctor documents`);
    } catch (error) {
      console.log('ℹ️  No doctor documents with userId field found');
    }
    
    try {
      const result = await mongoose.connection.db.collection('users').updateMany(
        { userId: { $exists: true } },
        { $unset: { userId: "" } }
      );
      console.log(`✅ Removed userId field from ${result.modifiedCount} user documents`);
    } catch (error) {
      console.log('ℹ️  No user documents with userId field found');
    }
    
    // Create proper indexes for the JavaScript models
    console.log('\nCreating proper indexes...\n');
    
    try {
      await mongoose.connection.db.collection('users').createIndex({ phoneNumber: 1 }, { unique: true });
      console.log('✅ Created unique index on phoneNumber for users collection');
    } catch (error) {
      console.log('ℹ️  phoneNumber index already exists or error creating it');
    }
    
    try {
      await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true, sparse: true });
      console.log('✅ Created unique sparse index on email for users collection');
    } catch (error) {
      console.log('ℹ️  email index already exists or error creating it');
    }
    
    try {
      await mongoose.connection.db.collection('patients').createIndex({ phoneNumber: 1 }, { unique: true });
      console.log('✅ Created unique index on phoneNumber for patients collection');
    } catch (error) {
      console.log('ℹ️  phoneNumber index already exists or error creating it');
    }
    
    try {
      await mongoose.connection.db.collection('doctors').createIndex({ phoneNumber: 1 }, { unique: true });
      console.log('✅ Created unique index on phoneNumber for doctors collection');
    } catch (error) {
      console.log('ℹ️  phoneNumber index already exists or error creating it');
    }
    
    try {
      await mongoose.connection.db.collection('doctors').createIndex({ licenseNumber: 1 }, { unique: true });
      console.log('✅ Created unique index on licenseNumber for doctors collection');
    } catch (error) {
      console.log('ℹ️  licenseNumber index already exists or error creating it');
    }
    
    console.log('\n✅ Database conflicts fixed successfully!');
    
  } catch (error) {
    console.error('Error fixing database conflicts:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the fix
fixDatabaseConflicts(); 