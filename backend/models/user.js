const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
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
  sexe: {
    type: String,
    enum: ['homme', 'femme']
  },
  etablissement: {
    type: String,
    trim: true
  },
  filiere: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'enseignant', 'etudiant'],
    default: 'etudiant'
  },
  dateNaissance: {
    type: Date
  },
  dateInscription: {
    type: Date,
    default: Date.now
  }
});

// Middleware de hachage du mot de passe
utilisateurSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();
  try {
    this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode de comparaison de mot de passe
utilisateurSchema.methods.comparePassword = async function (motDePasseEntré) {
  return await bcrypt.compare(motDePasseEntré, this.motDePasse);
};

// Export du modèle en précisant le nom de la collection
module.exports = mongoose.model('User', utilisateurSchema, 'utilisateurs');