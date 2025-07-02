const mongoose = require('mongoose');
const WebSocket = require('ws');

// Test database connection
async function testDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/medconnect', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database connection successful');

    // Test doctor collection
    const doctors = await mongoose.connection.db.collection('doctors').find({}).toArray();
    console.log(`📊 Found ${doctors.length} doctors in database`);

    // Test users collection
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log(`👥 Found ${users.length} users in database`);

    // Test consultations collection
    const consultations = await mongoose.connection.db.collection('consultations').find({}).toArray();
    console.log(`💬 Found ${consultations.length} consultations in database`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

// Test WebSocket connection
function testWebSocket() {
  const ws = new WebSocket('ws://localhost:5000');

  ws.on('open', () => {
    console.log('✅ WebSocket connection established');
  });

  ws.on('message', (data) => {
    console.log('📨 Received WebSocket message:', data.toString());
  });

  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });

  ws.on('close', () => {
    console.log('🔌 WebSocket connection closed');
  });

  // Send a test message after 1 second
  setTimeout(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'test', message: 'Hello from test script' }));
    }
  }, 1000);
}

// Run tests
console.log('🔍 Starting connection tests...');
testDatabase();
testWebSocket(); 