const mongoose = require('mongoose');

// Définition du schéma pour une réponse d'étudiant
const reponseSchema = new mongoose.Schema({
  // Référence à l'examen concerné
  examen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examen',
    required: true
  },

  // Référence à l'étudiant ayant répondu
  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },

  // Référence à la question concernée
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },

  // Réponse saisie par l'étudiant (texte ou choix)
  reponse: {
    type: String,
    required: true
  },

  // Score obtenu pour cette question
  scoreObtenu: {
    type: Number,
    default: 0
  },

  // Temps pris pour répondre (en secondes)
  tempsPris: {
    type: Number,
    default: 0
  },

  // Position géographique au moment de la réponse
  positionGeo: {
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    }
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Export du modèle avec nom explicite de la collection
module.exports = mongoose.model('Reponse', reponseSchema, 'reponses');