const Resultat = require("../models/Result");
const Question = require("../models/Question");
const { calculerScore } = require("../utils/scoreCalculator");

exports.enregistrerResultat = async (req, res) => {
  try {
    const { examenId, reponses } = req.body;

    // Vérification si les données nécessaires sont présentes
    if (!examenId || !reponses) {
      return res.status(400).json({ message: "Examen et réponses requis." });
    }

    // Récupérer les questions associées à l'examen
    const questions = await Question.find({ examenId });

    // Calcul du score en fonction des réponses et des questions
    const score = calculerScore(questions, reponses);

    // Création de la nouvelle entrée de résultat
    const nouveauResultat = new Resultat({
      utilisateur: req.user.id, // ID de l'utilisateur (étudiant)
      examen: examenId, // ID de l'examen
      score, // Le score calculé
      réponses: reponses, // Les réponses de l'utilisateur
      localisation: req.geoLocation // Localisation de l'utilisateur (si disponible)
    });

    // Sauvegarde du résultat dans la base de données
    await nouveauResultat.save();

    // Envoi de la réponse avec le score et le résultat enregistré
    res.status(201).json({
      message: "Résultat enregistré avec succès.",
      score,
      resultat: nouveauResultat
    });

  } catch (erreur) {
    // Gestion des erreurs
    console.error("Erreur lors de l'enregistrement du résultat :", erreur);
    res.status(500).json({ message: "Erreur serveur." });
  }
};