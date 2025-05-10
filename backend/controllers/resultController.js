const Result = require("../models/Result");
const Question = require("../models/Question");
const { calculerScore } = require("../utils/scoreCalculator");

// Enregistrement du résultat avec score et géolocalisation
exports.enregistrerResultat = async (req, res) => {
  try {
    const { examenId, reponses } = req.body;

    // Vérification des données obligatoires
    if (!examenId || !reponses) {
      return res.status(400).json({ message: "Examen et réponses requis." });
    }

    // Récupération des questions liées à l'examen
    const questions = await Question.find({ examenId });

    // Calcul du score à partir des réponses
    const score = calculerScore(questions, reponses);

    // Création du résultat
    const nouveauResultat = new Result({
      etudiantId: req.user.id, // ID de l’étudiant connecté
      examenId: examenId,
      score: score,
      geoLocation: req.geoLocation || { lat: null, lon: null } // si géolocalisation dispo
    });

    // Sauvegarde
    await nouveauResultat.save();

    // Réponse
    res.status(201).json({
      message: "Résultat enregistré avec succès.",
      score,
      resultat: nouveauResultat
    });

  } catch (erreur) {
    console.error("Erreur lors de l'enregistrement du résultat :", erreur);
    res.status(500).json({ message: "Erreur serveur." });
  }
};