const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  examenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  type: {
    type: String,
    enum: ['qcm', 'directe'],
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  // Pour les QCM
  choix: {
    type: [String],
    default: []
  },
  bonneReponse: {
    type: String,
    default: ''
  },
  // Pour les questions directes
  reponseText: {
    type: String,
    default: ''
  },
  tolerance: {
    type: Number,
    default: 0 // pour les questions directes avec tolérance (en pourcentage ou marge d’erreur)
  },
  note: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

module.exports = mongoose.model('Question', questionSchema);