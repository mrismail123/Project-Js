const User = require('../models/User');
const { genererToken } = require('../utils/tokenGenerator'); // Fonction pour générer le token

// Contrôleur pour l'inscription
exports.inscription = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    // Vérifier que tous les champs sont fournis
    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExist = await User.findOne({ email });
    if (utilisateurExist) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Créer un nouvel utilisateur
    const nouvelUtilisateur = new User({
      nom,
      email,
      motDePasse
    });

    // Hacher le mot de passe avant de le sauvegarder (assurez-vous que votre modèle a une méthode comparePassword)
    await nouvelUtilisateur.save();

    // Générer un token JWT pour l'utilisateur
    const token = genererToken(nouvelUtilisateur);

    // Réponse avec le token et les informations de l'utilisateur
    res.status(201).json({
      message: 'Utilisateur inscrit avec succès.',
      token,
      utilisateur: {
        id: nouvelUtilisateur._id,
        nom: nouvelUtilisateur.nom,
        email: nouvelUtilisateur.email,
        role: nouvelUtilisateur.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
  }
};

// Contrôleur pour la connexion
exports.connexion = async (req, res) => {
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
    const token = genererToken(utilisateur);

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