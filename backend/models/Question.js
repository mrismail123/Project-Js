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
  titre: {
    type: String,
    required: true
  },
  choix: [String], // Liste des options pour QCM

  bonneReponse: [String], // Pour QCM: tableau de valeurs correctes

  reponseText: String, // Pour les questions directes
  tolerance: Number, // En pourcentage pour les réponses directes

  note: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Question', questionSchema);