require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app'); // Import de l'application Express

const PORT = process.env.PORT || 5000;

// Vérification de la présence de MONGO_URI
if (!process.env.MONGO_URI) {
  console.error('Variable MONGO_URI manquante dans .env');
  process.exit(1);
}

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB avec succès');
    
    // Démarrer le serveur Express uniquement après la connexion à MongoDB
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion MongoDB:', err.message);
  });

