const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// Créer une nouvelle question
router.post("/", questionController.ajouterQuestion);

// Récupérer toutes les questions
router.get("/", questionController.getQuestions);

// Récupérer une question par ID
router.get("/:id", questionController.getQuestionById);

// Mettre à jour une question
router.put("/:id", questionController.updateQuestion);

// Supprimer une question
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;