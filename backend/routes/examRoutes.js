const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Route pour créer un examen
router.post('/create', examController.createExam);

// Route pour récupérer tous les examens
router.get('/', examController.getExams);

// Route pour récupérer les questions d’un examen avec un timer par question
router.get('/:examenId/questions-timer', examController.getQuestionsAvecTimer);

module.exports = router;