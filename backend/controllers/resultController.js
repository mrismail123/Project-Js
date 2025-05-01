const Resultat = require("../models/Result");
const Question = require("../models/Question");
const { calculerScore } = require("../utils/scoreCalculator");

exports.enregistrerResultat = async (req, res) => {
  try {
    const { examenId, reponses } = req.body;

    if (!examenId || !reponses) {
      return res.status(400).json({ message: "Examen et réponses requis." });
    }

    const questions = await Question.find({ examenId });
    const score = calculerScore(questions, reponses);

    const nouveauResultat = new Resultat({
      etudiantId: req.user.id,
      examenId,
      score,
      geoLocation: req.geoLocation // <-- ici on enregistre les coordonnées
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