// Import des modules nécessaires
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route pour créer une question
router.post('/creer', questionController.creerQuestion);

// Route pour obtenir toutes les questions
router.get('/', questionController.getQuestions);

// Route pour obtenir une question par ID
router.get('/:id', questionController.getQuestionById);

// Route pour mettre à jour une question
router.put('/:id', questionController.updateQuestion);

// Route pour supprimer une question
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;