// Importation des modules nécessaires
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Configuration des variables d'environnement
dotenv.config();

// Importation des routes
const authRoutes = require('./routes/authRoutes');           // Authentification
const examRoutes = require('./routes/examRoutes');           // Examens
const questionRoutes = require('./routes/questionRoutes');   // Questions
const resultRoutes = require('./routes/resultRoutes');       // Résultats
const geoRoutes = require('./routes/geolocalisationRoutes'); // Géolocalisation

// Initialisation de l'application Express
const app = express();

// Middleware globaux
app.use(cors());
app.use(express.json());

// Connexion à la base de données MongoDB
const connecterDB = require('./config/db');
connecterDB(); // Appel de la fonction de connexion

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/examens', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/resultats', resultRoutes);
app.use('/api/geolocalisation', geoRoutes);

// Gestion des erreurs générales
app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err.stack);
  res.status(500).send('Quelque chose s\'est mal passé!');
});

// Affichage des routes disponibles
console.log('Routes disponibles :');
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`${middleware.route.path} [${Object.keys(middleware.route.methods).join(', ').toUpperCase()}]`);
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

// Export de l'application (utile pour les tests)
module.exports = app;
