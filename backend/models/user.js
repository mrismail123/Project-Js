const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    motDePasse: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['enseignant', 'etudiant'],
        default: 'etudiant'
    },
    dateInscription: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema, 'utilisateurs');