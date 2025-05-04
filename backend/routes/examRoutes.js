const express = require("express");
const routeur = express.Router();

const {
  creerExamen,
  listerExamens
} = require("../controllers/examController");

const { verifierToken } = require("../middlewares/authMiddleware");
const { verifierRole } = require("../middlewares/roleMiddleware");

// Route pour créer un examen (enseignant)
routeur.post("/", verifierToken, verifierRole("enseignant"), creerExamen);

// Route pour lister les examens de l'enseignant
routeur.get("/", verifierToken, verifierRole("enseignant"), listerExamens);

module.exports = routeur;