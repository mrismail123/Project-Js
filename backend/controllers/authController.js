const Utilisateur = require('../models/User');
const { genererToken } = require('../utils/tokenGenerator'); // Utilisation propre du token

// Contrôleur pour l'inscription
exports.inscription = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      motDePasse,
      sexe,
      dateNaissance,
      etablissement,
      filiere,
      role
    } = req.body;

    // Vérification des champs requis
    if (!nom || !prenom || !email || !motDePasse || !sexe || !dateNaissance || !etablissement || !filiere) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExist = await Utilisateur.findOne({ email });
    if (utilisateurExist) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Création du nouvel utilisateur
    const nouvelUtilisateur = new Utilisateur({
      nom,
      prenom,
      email,
      motDePasse,
      sexe,
      dateNaissance,
      etablissement,
      filiere,
      role
    });

    await nouvelUtilisateur.save();

    const token = genererToken(nouvelUtilisateur._id);

    res.status(201).json({
      message: 'Inscription réussie.',
      token,
      utilisateur: {
        id: nouvelUtilisateur._id,
        nom: nouvelUtilisateur.nom,
        prenom: nouvelUtilisateur.prenom,
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

    if (!email || !motDePasse) {
      return res.status(400).json({ message: 'Veuillez fournir email et mot de passe.' });
    }

    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const motDePasseValide = await utilisateur.comparePassword(motDePasse);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const token = genererToken(utilisateur._id);

    res.status(200).json({
      message: 'Connexion réussie.',
      token,
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
};