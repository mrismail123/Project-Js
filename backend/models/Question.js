const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  examenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examen',
    required: true
  },
  type: {
    type: String,
    enum: ['qcm', 'directe'],
    required: true
  },
  enonce: {
    type: String,
    required: true
  },
  // Médias facultatifs
  media: {
    image: { type: String, default: null },
    audio: { type: String, default: null },
    video: { type: String, default: null }
  },
  // Pour les QCM
  options: {
    type: [String],
    default: []
  },
  bonnesReponses: {
    type: [String],
    default: []
  },
  // Pour les questions directes
  reponseDirecte: {
    type: String,
    default: ''
  },
  tolerance: {
    type: Number,
    default: 0
  },
  note: {
    type: Number,
    default: 1
  },
  duree: {
    type: Number, // durée en secondes
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema, 'questions');