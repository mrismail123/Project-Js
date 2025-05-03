const mongoose = require('mongoose');

// Define the structure of the user data (fields required)
const userSchema = new mongoose.Schema({
  email: String,              // Email address
  nom: String,                // Last name
  prenom: String,             // First name
  dateNaissance: Date,        // Date of birth
  sexe: String,               // Gender
  etablissement: String,      // Educational institution
  filiere: String,            // Field of study
  typeUtilisateur: String     // 'etudiant' (student) or 'enseignant' (teacher)
});

// Create and export the model from the schema
module.exports = mongoose.model('User', userSchema);