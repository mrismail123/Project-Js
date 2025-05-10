const express = require('express');
const router = express.Router();
const {
  creerExamen,           // Fonction pour créer un examen
  listeExamens,          // Fonction pour lister les examens
  getQuestionsAvecTimer, // Fonction pour récupérer les questions avec un timer
  deleteExam             // Fonction pour supprimer un examen
} = require('../controllers/examController');

const verifierToken = require('../middleware/verifierToken');  // Middleware pour vérifier le token JWT

// Créer un examen (enseignant connecté)
router.post('/create', verifierToken, creerExamen);

// Récupérer tous les examens de l’enseignant
router.get('/', verifierToken, listeExamens);

// Récupérer les questions d’un examen avec timer
router.get('/:examenId/questions-timer', verifierToken, getQuestionsAvecTimer);

// Supprimer un examen spécifique
router.delete('/:id', verifierToken, deleteExam);

module.exports = router;