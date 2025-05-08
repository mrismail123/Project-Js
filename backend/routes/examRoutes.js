const express = require('express');
const router = express.Router();
const { createExam, getExams } = require('../controllers/examController');

// Route pour créer un examen
router.post('/create', createExam);

// Route pour récupérer tous les examens
router.get('/', getExams);

module.exports = router;