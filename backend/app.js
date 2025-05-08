require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes d'authentification
app.use('/api/auth', authRoutes);

// Connexion à MongoDB et lancement du serveur
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error('La variable MONGO_URI est manquante dans le fichier .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connexion à MongoDB réussie');

    // Lancer le serveur seulement après la connexion
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion à MongoDB :', err.message);
  });

