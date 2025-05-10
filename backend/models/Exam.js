const mongoose = require('mongoose');

const examenSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publicCible: {
    type: String,
    required: true // ex: "2e année MIP, S4, groupe A"
  },
  lienAcces: {
    type: String,
    unique: true,
    required: true // Lien généré automatiquement
  },
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  durée: {
    type: Number, // Durée totale de l'examen en secondes
    default: null
  },
  dureeParQuestion: {
    type: Number,
    default: null
  },
  date_creation: {
    type: Date,
    default: Date.now
  }
});

// Export du modèle
module.exports = mongoose.model('Exam', examenSchema, 'Exam');