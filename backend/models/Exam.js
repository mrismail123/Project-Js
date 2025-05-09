const mongoose = require('mongoose');

// Définition du schéma pour un examen
const examSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true, // Le titre est obligatoire
  },
  description: {
    type: String,
    required: true, // La description est obligatoire
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', // Référence au modèle Question
  }],
  durée: {
    type: Number,
    required: true, // La durée totale de l'examen en secondes
  },
  dureeParQuestion: {
    type: Number, // Durée par question en secondes (optionnel)
    default: null
  },
  date_creation: {
    type: Date,
    default: Date.now, // La date de création de l'examen
  },
});

// Création du modèle Exam basé sur le schéma défini
const Exam = mongoose.model('Exam', examSchema);

// Exportation du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Exam;