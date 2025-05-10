const Exam = require('../models/Exam');
const Question = require('../models/Question');

// Ajouter un examen (Créer un examen)
exports.creerExamen = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    // Vérifier les données requises
    if (!title || !description) {
      return res.status(400).json({ message: 'Le titre et la description sont requis.' });
    }

    // Créer un nouvel examen
    const newExam = new Exam({
      title,
      description,
      questions, // Liste des questions (ici on suppose que l'ID des questions a déjà été défini)
    });

    // Sauvegarder l'examen dans la base de données
    await newExam.save();

    // Réponse de succès
    res.status(201).json({
      message: 'Examen créé avec succès.',
      exam: newExam,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la création de l\'examen.' });
  }
};

// Récupérer tous les examens
exports.listeExamens = async (req, res) => {
  try {
    const exams = await Exam.find(); // Récupérer tous les examens
    res.status(200).json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des examens.' });
  }
};

// Récupérer les questions d’un examen avec timer
exports.getQuestionsAvecTimer = async (req, res) => {
  try {
    const { examenId } = req.params;

    // Récupérer l'examen par son ID
    const exam = await Exam.findById(examenId).populate('questions'); // Assurez-vous que le champ 'questions' est bien une référence à des questions

    if (!exam) {
      return res.status(404).json({ message: 'Examen introuvable.' });
    }

    // Récupérer les questions avec un timer
    const questionsAvecTimer = exam.questions.map(question => ({
      ...question._doc,
      timer: 30, // Exemple de timer, peut être ajusté selon la logique de votre application
    }));

    res.status(200).json({
      exam: exam.title,
      questions: questionsAvecTimer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des questions avec timer.' });
  }
};

// Supprimer un examen
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'examen existe
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ message: 'Examen introuvable.' });
    }

    // Supprimer l'examen
    await exam.remove();

    // Réponse de succès
    res.status(200).json({ message: 'Examen supprimé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'examen.' });
  }
};