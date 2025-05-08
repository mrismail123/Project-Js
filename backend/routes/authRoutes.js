const express = require('express');
const router = express.Router();
const { inscription, connexion } = require('../controllers/authController');

// Route pour l'inscription
router.post('/inscription', inscription);

// Route pour la connexion
router.post('/connexion', connexion);

module.exports = router;