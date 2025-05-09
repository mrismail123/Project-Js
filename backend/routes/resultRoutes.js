const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Soumission des réponses et calcul du score
router.post('/soumettre', resultController.enregistrerResultat);

module.exports = router;