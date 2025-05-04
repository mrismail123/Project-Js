const Question = require("../models/Question");

// Ajouter une question (texte ou QCM)
const addQuestion = async (req, res) => {
  try {
    const { texte, type, options, bonneReponse, note, duree, examId } = req.body;

    // Validation basique
    if (!texte || !examId) {
      return res.status(400).json({ message: "Le texte et l'examen sont requis." });
    }

    // Si c'est un QCM, vérifier les options et la bonne réponse
    if (type === "qcm") {
      if (!options || options.length < 2 || !bonneReponse) {
        return res.status(400).json({ message: "Un QCM doit avoir au moins deux options et une bonne réponse." });
      }
      if (!options.includes(bonneReponse)) {
        return res.status(400).json({ message: "La bonne réponse doit faire partie des options." });
      }
    }

    const question = new Question({
      texte,
      type,
      options: type === "qcm" ? options : [],
      bonneReponse: type === "qcm" ? bonneReponse : null,
      note,
      duree,
      examId
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la question:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  addQuestion,
  // autres fonctions...
};