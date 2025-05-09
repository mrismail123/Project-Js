const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Importation des routes
const authRoutes = require('./routes/authRoutes');         // Authentification
const examRoutes = require('./routes/examRoutes');         // Examens
const questionRoutes = require('./routes/questionRoutes'); // Questions (QCM + directes)
const resultRoutes = require('./routes/resultRoutes');     // Résultats

// Création de l'application Express
const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/examens', examRoutes);
app.use('/api/questions', questionRoutes);   // Route des questions (avec tolérance)
app.use('/api/resultats', resultRoutes);

// Connexion à MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connexion à MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur MongoDB :', err.message);
  });

// Gestion des erreurs générales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé!');
});

// Export de l'app (facultatif pour les tests)
module.exports = app;
