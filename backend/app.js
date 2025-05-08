const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes'); // Routes pour l'authentification
const examRoutes = require('./routes/examRoutes'); // Routes pour les examens

dotenv.config(); // Charger les variables d'environnement depuis .env

const app = express();

// Middleware pour parser les données JSON et activer CORS
app.use(cors());
app.use(express.json());

// Routes d'authentification
app.use('/api/auth', authRoutes);

// Routes des examens
app.use('/api/examens', examRoutes);

// Connexion à la base de données MongoDB
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





