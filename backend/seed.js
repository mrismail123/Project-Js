const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question'); // Assurez-vous que le chemin est correct

dotenv.config();

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Connexion à MongoDB réussie');

    // Suppression des questions existantes
    await Question.deleteMany();

    // Création de questions exemples
    const questions = [
        {
            texte: "Quel est le résultat de 2 + 2 ?",
            reponses: ["3", "4", "5", "6"],
            bonneReponse: 1,
            duree: 30,
            note: 5
        },
        {
            texte: "Quelle est la capitale de la France ?",
            reponses: ["Madrid", "Paris", "Berlin", "Rome"],
            bonneReponse: 1,
            duree: 45,
            note: 4
        },
        {
            texte: "Quelle est la couleur du ciel ?",
            reponses: ["Rouge", "Bleu", "Vert", "Jaune"],
            bonneReponse: 1,
            duree: 20,
            note: 2
        }
    ];

    // Insertion dans la base de données
    await Question.insertMany(questions);
    console.log('Questions ajoutées avec succès');

    // Fermer la connexion
    mongoose.connection.close();
})
.catch(err => {
    console.error('Erreur lors de la connexion ou insertion :', err.message);
});