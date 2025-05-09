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
  choix: [String], // Pour QCM

  bonneReponse: [String], // Pour QCM (tableau)
  reponseText: String,     // Pour question directe
  tolerance: Number,       // Tolérance (%) pour question directe

  note: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Question', questionSchema);