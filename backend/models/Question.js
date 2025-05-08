// Import des modules nécessaires
const mongoose = require('mongoose');

// Définition du modèle Question
const questionSchema = new mongoose.Schema({
    texte: {
        type: String,
        required: true
    },
    reponses: [{
        type: String,
        required: true
    }],
    bonneReponse: {
        type: Number,  // L'indice de la bonne réponse dans le tableau des réponses
        required: true
    },
    duree: {
        type: Number,  // Durée en secondes
        required: true
    },
    note: {
        type: Number,  // La note du question
        required: true
    }
}, {
    timestamps: true // Enregistre les dates de création et de modification
});

// Exportation du modèle
module.exports = mongoose.model('Question', questionSchema);