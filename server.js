const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db"); // REQUIRE GHI MARRA WAHDA

// Config
dotenv.config();
connectDB(); // Appel connexion DB

// Init App
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5123",
    credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send("Server Backend operations!"); // GHI WAHDA
});

// Test DB (Optional)
const testDB = async () => {
  try {
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    await TestModel.create({ name: 'Test' });
    console.log('📝 Test document créé avec succès!');
  } catch (err) {
    console.log('❌ Erreur test:', err);
  }
};
testDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});