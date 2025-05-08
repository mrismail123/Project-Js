require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes d'authentification
app.use('/api/auth', authRoutes);

// Vérification de la variable MONGO_URI dans le fichier .env
if (!process.env.MONGO_URI) {
  console.error('La variable MONGO_URI est manquante dans le fichier .env');
  process.exit(1);  // Arrêter l'application si la variable n'existe pas
}

// Connexion à MongoDB et lancement du serveur
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connexion à MongoDB réussie');

  // Lancer le serveur seulement après la connexion à MongoDB
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Erreur MongoDB :', err.message);
});

