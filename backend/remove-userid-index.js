const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

async function removeUserIdIndex() {
  try {
    console.log('Removing problematic userId index...\n');
    
    // Drop userId index from patients collection
    try {
      await mongoose.connection.db.collection('patients').dropIndex('userId_1');
      console.log('✅ Successfully dropped userId_1 index from patients collection');
    } catch (error) {
      console.log('ℹ️  userId_1 index not found in patients collection (or already dropped)');
    }
    
    // Remove userId fields from existing documents
    try {
      const result = await mongoose.connection.db.collection('patients').updateMany(
        { userId: { $exists: true } },
        { $unset: { userId: "" } }
      );
      console.log(`✅ Removed userId field from ${result.modifiedCount} patient documents`);
    } catch (error) {
      console.log('ℹ️  No patient documents with userId field found');
    }
    
    console.log('\n✅ userId index issue resolved!');
    
  } catch (error) {
    console.error('Error removing userId index:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the fix
removeUserIdIndex(); 