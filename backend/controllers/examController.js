const Exam = require("../models/Exam");

// Créer un nouvel examen
exports.creerExamen = async (req, res) => {
  try {
    const { titre, description, dateDebut, dateFin, duree, noteTotale } = req.body;

    if (!titre || !dateDebut || !dateFin || !duree) {
      return res.status(400).json({ message: "Champs requis manquants." });
    }

    const nouvelExamen = new Exam({
      titre,
      description,
      dateDebut,
      dateFin,
      duree,
      noteTotale,
      enseignantId: req.user.id
    });

    await nouvelExamen.save();

    res.status(201).json({
      message: "Examen créé avec succès.",
      examen: nouvelExamen
    });

  } catch (erreur) {
    console.error("Erreur lors de la création de l'examen :", erreur);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Obtenir tous les examens créés par un enseignant
exports.listerExamens = async (req, res) => {
  try {
    const examens = await Exam.find({ enseignantId: req.user.id });
    res.status(200).json(examens);
  } catch (erreur) {
    console.error("Erreur lors du chargement des examens :", erreur);
    res.status(500).json({ message: "Erreur serveur." });
  }
};