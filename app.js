// Import the Express library
const express = require('express');

// Create an instance of an Express app
const app = express();

// Set the port number
const PORT = 3000;

// Define a route for the homepage
app.get('/', (req, res) => {
    res.send('Welcome to the Exam Platform!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
const helmet = require('helmet');
app.use(helmet());
const morgan = require('morgan');
app.use(morgan('dev'));