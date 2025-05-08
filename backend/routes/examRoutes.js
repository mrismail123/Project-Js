const express = require('express');
const verifierJWT = require('../middlewares/authMiddleware');  // Import du middleware pour la vérification du JWT
const verifierRole = require('../middlewares/roleMiddleware');  // Import du middleware pour la vérification du rôle

const router = express.Router();

// Route protégée qui nécessite que l'utilisateur soit de rôle "admin"
router.get('/admin/dashboard', verifierJWT, verifierRole(['admin']), (req, res) => {
  res.json({
    message: "Accès autorisé au tableau de bord de l'admin",  // "Accès au tableau de bord de l'administrateur"
    user: req.user  // Affiche les informations de l'utilisateur vérifiées
  });
});

// Route protégée qui nécessite que l'utilisateur soit de rôle "user" ou "admin"
router.get('/user/profile', verifierJWT, verifierRole(['user', 'admin']), (req, res) => {
  res.json({
    message: "Accès autorisé à votre profil utilisateur",  // "Accès à votre profil utilisateur"
    user: req.user  // Affiche les informations de l'utilisateur
  });
});

module.exports = router;