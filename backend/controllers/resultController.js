const Resultat = require("../models/Result");
const Question = require("../models/Question");
const { calculerScore } = require("../utils/scoreCalculator");

// Enregistrer le résultat après soumission
exports.enregistrerResultat = async (req, res) => {
  try {
    const { examenId, reponses, geoLocation } = req.body;

    if (!examenId || !reponses) {
      return res.status(400).json({ message: "Examen et réponses requis." });
    }

    // Récupérer toutes les questions liées à l'examen
    const questions = await Question.find({ examenId });

    // Calcul du score
    const score = calculerScore(questions, reponses);

    const nouveauResultat = new Resultat({
      examenId,
      etudiantId: req.user.id,
      score,
      geoLocation
    });

    await nouveauResultat.save();

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