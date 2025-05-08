const Exam = require('../models/Exam');

// Créer un nouvel examen
exports.createExam = async (req, res) => {
  try {
    const { titre, description, questions, durée } = req.body;

    const newExam = new Exam({
      titre,
      description,
      questions,
      durée,
    });

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

// Récupérer tous les examens
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('questions');
    res.status(200).json(exams);
  } catch (error) {
    console.error('Erreur récupération examens :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};