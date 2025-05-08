const jwt = require('jsonwebtoken');

// Fonction pour générer le JWT
const genererToken = (utilisateur) => {
  return jwt.sign(
    {
      id: utilisateur._id,       // ID de l'utilisateur
      role: utilisateur.role     // Rôle de l'utilisateur
    },
    process.env.JWT_SECRET,       // Clé secrète de l'environnement
    { expiresIn: '1h' }           // Expiration du token après 1 heure
  );
};

module.exports = { genererToken };