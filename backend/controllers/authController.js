const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Contrôleur d'inscription
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password, type } = req.body;

    // Vérification des champs requis
    if (!nom || !prenom || !email || !password || !type) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    // Vérifier si l'utilisateur existe déjà
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "Email déjà utilisé." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer et sauvegarder l'utilisateur
    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      type,
    });

    await newUser.save();

    res.status(201).json({ message: "Utilisateur inscrit avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Contrôleur de connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Comparaison du mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Envoi du token via cookie (optionnel)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000, // 1 jour
    });

    // Réponse sans le mot de passe
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      message: "Connexion réussie.",
      token, // à utiliser côté frontend
      user: userData,
    });

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};