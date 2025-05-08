const User = require('../models/User');
const générerToken = require('../utils/tokenGenerator');

// Contrôleur pour la connexion
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifier les champs
    if (!email || !motDePasse) {
      return res.status(400).json({ message: 'Veuillez fournir email et mot de passe.' });
    }

    // Rechercher l'utilisateur
    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Comparaison du mot de passe
    const motDePasseValide = await utilisateur.comparePassword(motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Générer le token JWT
    const token = générerToken(utilisateur);

    // Réponse avec le token
    res.status(200).json({
      message: 'Connexion réussie.',
      token,
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
};