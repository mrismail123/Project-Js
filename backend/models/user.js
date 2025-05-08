const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true // Supprimer les espaces avant/après
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true // Transformer en minuscules
  },
  motDePasse: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'enseignant', 'etudiant', 'user'],
    default: 'etudiant' // Valeur par défaut
  },
  dateInscription: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour chiffrer le mot de passe avant la sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();

  try {
    this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (motDePasseEntré) {
  return await bcrypt.compare(motDePasseEntré, this.motDePasse);
};

// Export du modèle avec nom de collection "utilisateurs"
module.exports = mongoose.model('User', userSchema, 'utilisateurs');