const jwt = require('jsonwebtoken');
const User = require('../models/User'); // تأكد من أن المسار صحيح للنموذج User

// Middleware pour vérifier la validité du token JWT et l'utilisateur dans la base de données
const verifierToken = async (req, res, next) => {
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

    // Recherche de l'utilisateur dans la base de données avec l'ID du token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Ajout des informations de l'utilisateur à la requête
    req.user = user;

    // Passage au middleware suivant
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = verifierToken;