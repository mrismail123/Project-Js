const mongoose = require('mongoose');

// Définir la structure des données d'utilisateur (champs requis)
const utilisateurSchema = new mongoose.Schema({
  email: String,               // Adresse e-mail
  nom: String,                 // Nom de famille
  prenom: String,              // Prénom
  dateNaissance: Date,         // Date de naissance
  sexe: String,                // Sexe
  etablissement: String,       // Établissement scolaire
  filiere: String,             // Filière ou spécialité
  typeUtilisateur: String,     // 'etudiant' ou 'enseignant'
  motDePasse: String
});

// Créer et exporter le modèle basé sur le schéma
module.exports = mongoose.model('Utilisateur', utilisateurSchema);