const jwt = require('jsonwebtoken');

// Vérifie la validité du token JWT
const verifierToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie si le token est présent
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = verifierToken;