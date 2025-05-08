// Chargement des variables d'environnement
require('dotenv').config();

// Importations nécessaires
const mongoose = require('mongoose');
const app = require('./app'); // Import de l'application Express

// Configuration du port (priorité à .env ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

// Vérification de la présence de l'URI MongoDB
if (!process.env.MONGO_URI) {
  console.error('❌ Variable MONGO_URI manquante dans .env');
  process.exit(1);
}

// Connexion à MongoDB (version moderne sans options obsolètes)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB avec succès');
    
    // Démarrage du serveur Express
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
  });