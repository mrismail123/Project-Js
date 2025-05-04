const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  enseignantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  duree: {
    type: Number, // durée en minutes
    required: true
  },
  noteTotale: {
    type: Number,
    default: 20
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Exam", examSchema);