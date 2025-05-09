const Exam = require('../models/Exam');
const Question = require('../models/Question');

// Créer un nouvel examen
exports.createExam = async (req, res) => {
  try {
    const { titre, description, questions, durée } = req.body;

    // Vérifier si toutes les questions existent
    const validQuestions = await Question.find({ '_id': { $in: questions } });

    if (validQuestions.length !== questions.length) {
      return res.status(400).json({
        message: 'Une ou plusieurs questions n\'existent pas dans la base de données.',
      });
    }

    const newExam = new Exam({
      titre,
      description,
      questions,
      durée
    });

    await newExam.save();

    res.status(201).json({
      message: 'Examen créé avec succès.',
      exam: newExam
    });
  } catch (error) {
    console.error('Erreur création examen :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer tous les examens avec les questions
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('questions');
    res.status(200).json(exams);
  } catch (error) {
    console.error('Erreur récupération examens :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer les questions d’un examen avec timer
exports.getQuestionsAvecTimer = async (req, res) => {
  try {
    const examen = await Exam.findById(req.params.examenId).populate('questions');
    if (!examen) {
      return res.status(404).json({ message: 'Examen non trouvé' });
    }

    // Retourner durée totale et questions
    res.status(200).json({
      dureeParQuestion: examen.durée / examen.questions.length, // durée par question en secondes
      questions: examen.questions
    });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la récupération des questions', error: err.message });
  }
};