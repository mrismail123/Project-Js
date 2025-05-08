const jwt = require('jsonwebtoken');

// Génère un token JWT pour un utilisateur donné
const générerToken = (utilisateur) => {
  return jwt.sign(
    {
      id: utilisateur._id,
      role: utilisateur.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = générerToken;