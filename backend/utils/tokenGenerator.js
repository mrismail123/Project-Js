const jwt = require('jsonwebtoken');

// Générer un token JWT valable 7 jours
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

module.exports = generateToken;