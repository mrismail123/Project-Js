require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

(async () => {
  await connectDB();
  
  const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
  await TestModel.create({ name: 'Test' });
  console.log('📝 Test réussi!');
  process.exit();
})();