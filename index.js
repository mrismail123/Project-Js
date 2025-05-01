const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://nouhailabarrak:2NJNUUEJpDc9-YR@cluster0.3hrmjr8.mongodb.net/examDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Database connection failed:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});