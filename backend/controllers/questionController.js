// Import des modèles nécessaires
const Question = require('../models/Question');

// Fonction pour créer une question
exports.creerQuestion = async (req, res) => {
    try {
        const { texte, reponses, bonneReponse, duree, note } = req.body;

        // Création d'une nouvelle question
        const question = new Question({
            texte,
            reponses,
            bonneReponse,
            duree,
            note
        });

        // Sauvegarde de la question
        await question.save();
        res.status(201).json({ message: 'Question créée avec succès', question });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création de la question', error: err.message });
    }
};

// Fonction pour obtenir toutes les questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération des questions', error: err.message });
    }
};

// Fonction pour obtenir une question par son ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question non trouvée' });
        }
        res.status(200).json(question);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération de la question', error: err.message });
    }
};

// Fonction pour mettre à jour une question
exports.updateQuestion = async (req, res) => {
    try {
        const { texte, reponses, bonneReponse, duree, note } = req.body;

        const question = await Question.findByIdAndUpdate(
            req.params.id,
            { texte, reponses, bonneReponse, duree, note },
            { new: true }
        );

        if (!question) {
            return res.status(404).json({ message: 'Question non trouvée' });
        }

        res.status(200).json({ message: 'Question mise à jour avec succès', question });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la question', error: err.message });
    }
};

// Fonction pour supprimer une question
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question non trouvée' });
        }
        res.status(200).json({ message: 'Question supprimée avec succès' });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la question', error: err.message });
    }
};