const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT pour un utilisateur
const genererToken = (utilisateur) => {
  return jwt.sign(
    {
      id: utilisateur._id,        // ID de l'utilisateur
      role: utilisateur.role      // Rôle de l'utilisateur (ex: etudiant, enseignant, admin)
    },
    process.env.JWT_SECRET,       // Clé secrète définie dans le fichier .env
    {
      expiresIn: '1h'             // Durée de validité du token (ici 1 heure)
    }
  );
};

module.exports = { genererToken };