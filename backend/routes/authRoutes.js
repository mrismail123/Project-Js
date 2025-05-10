const express = require('express');
const router = express.Router();
const { inscription, connexion } = require('../controllers/authController');

// Routes officielles
router.post('/inscription', inscription);
router.post('/connexion', connexion);

// Alias pour compatibilité
router.post('/register', inscription);
router.post('/login', connexion);

module.exports = router;