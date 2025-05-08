const Exam = require('../models/Exam');
const Question = require('../models/Question');

// Fonction pour créer un examen
exports.createExam = async (req, res) => {
  try {
    const { titre, description, questions, durée } = req.body;

    // Vérifier si les questions existent dans la base de données
    const validQuestions = await Question.find({ '_id': { $in: questions } });

    if (validQuestions.length !== questions.length) {
      return res.status(400).json({
        message: 'Une ou plusieurs questions n\'existent pas dans la base de données.',
      });
    }

    // Création d'un nouvel examen avec les questions validées
    const newExam = new Exam({
      titre,
      description,
      questions, // tableau d'ID de questions
      durée,
    });

    // Sauvegarde de l'examen dans la base de données
    await newExam.save();

    res.status(201).json({
      message: 'L\'examen a été créé avec succès!',
      exam: newExam,
    });
  } catch (error) {
    console.error('Erreur création examen :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer tous les examens avec les questions associées
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('questions'); // Populer les questions dans l'examen
    res.status(200).json(exams);
  } catch (error) {
    console.error('Erreur récupération examens :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};