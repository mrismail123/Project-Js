const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Importation des routes
const authRoutes = require('./routes/authRoutes');      // Authentification
const examRoutes = require('./routes/examRoutes');      // Examens
const questionRoutes = require('./routes/questionRoutes'); // Questions
const resultRoutes = require('./routes/resultRoutes');  // Résultats

dotenv.config(); // Charger les variables d'environnement depuis .env

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/examens', examRoutes);
app.use('/api/questions', questionRoutes);  // Ajout de la route pour les questions
app.use('/api/resultats', resultRoutes);    // Ajout de la route pour les résultats

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

module.exports = app;





