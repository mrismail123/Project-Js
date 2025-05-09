// Import du modèle Question
const Question = require('../models/Question');

// Fonction pour ajouter une nouvelle question
exports.ajouterQuestion = async (req, res) => {
    try {
        const { examenId, type, titre, choix, bonneReponse, reponseText, tolerance, note } = req.body;

        const question = new Question({
            examenId,
            type,
            titre,
            choix,
            bonneReponse,
            reponseText,
            tolerance,
            note
        });

        await question.save();
        res.status(201).json({ message: 'Question ajoutée avec succès', question });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création de la question', error: err.message });
    }
};

// Fonction pour récupérer toutes les questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération des questions', error: err.message });
    }
};

// Fonction pour récupérer une question par ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json(question);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération de la question', error: err.message });
    }
};

// Fonction pour mettre à jour une question
exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json({ message: 'Question mise à jour avec succès', question });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la question', error: err.message });
    }
};

// Fonction pour supprimer une question
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question non trouvée' });
        res.status(200).json({ message: 'Question supprimée avec succès' });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la question', error: err.message });
    }
};