const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes'); // Ajouter les routes pour les examens

dotenv.config(); // Charger les variables d'environnement depuis .env
const app = express();

// Middleware pour accepter les requêtes JSON
app.use(cors());
app.use(express.json());

// Routes d'authentification
app.use('/api/auth', authRoutes);

// Routes des examens
app.use('/api/examens', examRoutes); // Ajouter la route pour les examens

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



