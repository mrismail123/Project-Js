const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  etudiantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  examenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  dateSoumission: {
    type: Date,
    default: Date.now
  },
  geoLocation: {
    lat: Number,
    lon: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Result", resultSchema);