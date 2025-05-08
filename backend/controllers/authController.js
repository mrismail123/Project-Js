const User = require('../models/User');
const { genererToken } = require('../utils/tokenGenerator'); // Importation de la fonction générerToken

// Contrôleur pour la connexion
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifier si les champs sont fournis
    if (!email || !motDePasse) {
      return res.status(400).json({ message: 'Veuillez fournir email et mot de passe.' });
    }

    // Rechercher l'utilisateur dans la base de données
    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Comparer le mot de passe fourni avec celui de la base de données
    const motDePasseValide = await utilisateur.comparePassword(motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Générer le token JWT pour l'utilisateur
    const token = genererToken(utilisateur); // Génération du token

    // Réponse avec le token et les informations de l'utilisateur
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