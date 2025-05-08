const jwt = require('jsonwebtoken');

// Middleware pour vérifier la validité du token JWT
const verifierToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie si le header Authorization est présent et commence par 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }

  // Extraction du token sans le préfixe 'Bearer'
  const token = authHeader.split(' ')[1];

  try {
    // Vérification du token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajout des informations de l'utilisateur à la requête
    req.user = decoded;

    // Passage au middleware suivant
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = verifierToken;