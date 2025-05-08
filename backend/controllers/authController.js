const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/tokenGenerator');

// Contrôleur d'inscription
exports.inscription = async (req, res) => {
  const { nom, email, motDePasse, role } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hasher le mot de passe
    const motDePasseCrypte = await bcrypt.hash(motDePasse, 10);

    // Créer un nouvel utilisateur
    const nouvelUtilisateur = new User({
      nom,
      email,
      motDePasse: motDePasseCrypte,
      role
    });

    await nouvelUtilisateur.save();

    // Générer un token JWT
    const token = generateToken(nouvelUtilisateur._id);

    res.status(201).json({
      message: "Utilisateur inscrit avec succès",
      utilisateur: {
        id: nouvelUtilisateur._id,
        nom: nouvelUtilisateur.nom,
        email: nouvelUtilisateur.email,
        role: nouvelUtilisateur.role
      },
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
};