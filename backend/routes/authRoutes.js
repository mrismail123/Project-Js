const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur'); // Importation du modèle Utilisateur
const verifierJeton = require('../middlewares/authMiddleware'); // Importation du middleware pour vérifier le JWT

const router = express.Router(); // Création du routeur Express

// Route pour l'inscription (création d'un nouvel utilisateur)
router.post('/inscription', async (req, res) => {
  const { email, motDePasse, nom, prenom } = req.body; // Extraction des données du corps de la requête
  try {
    // Vérification si l'utilisateur existe déjà avec le même e-mail
    const existe = await Utilisateur.findOne({ email });
    if (existe) {
      return res.status(400).send("Cet e-mail est déjà utilisé.");
    }

    // Chiffrement du mot de passe avec bcrypt
    const motDePasseCrypte = await bcrypt.hash(motDePasse, 10);

    // Création d'un nouvel utilisateur
    const nouvelUtilisateur = new Utilisateur({
      email,
      nom,
      prenom,
      motDePasse: motDePasseCrypte
    });

    // Sauvegarde de l'utilisateur dans la base de données
    await nouvelUtilisateur.save();
    res.status(201).send("Utilisateur inscrit avec succès !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de l'inscription.");
  }
});

// Route pour la connexion (vérification de l'utilisateur et génération du JWT)
router.post('/connexion', async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    // Recherche de l'utilisateur dans la base de données par email
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(401).send('Utilisateur non trouvé.');
    }

    // Vérification du mot de passe
    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) {
      return res.status(401).send('Mot de passe incorrect.');
    }

    // Génération du JWT (token)
    const jeton = jwt.sign(
      { id: utilisateur._id, type: utilisateur.typeUtilisateur },
      process.env.JWT_SECRET, // Utilisation du secret stocké dans l'environnement
      { expiresIn: '1h' } // Durée de validité du token (1 heure)
    );

    // Envoi du token à l'utilisateur
    res.status(200).json({ jeton });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la connexion.");
  }
});

module.exports = router; // Exportation des routes pour utilisation dans l'application principale
