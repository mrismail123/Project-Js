// Importation de mongoose pour se connecter à MongoDB
const mongoose = require("mongoose");

// Fonction asynchrone pour établir la connexion
const connectDB = async () => {
  try {
    // Connexion à la base de données avec les options recommandées
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connexion à MongoDB réussie");
  } catch (err) {
    // En cas d'erreur de connexion, affichage de l'erreur et arrêt de l'application
    console.error("❌ Erreur de connexion à MongoDB :", err);
    process.exit(1);
  }
};

// Exportation de la fonction pour l'utiliser dans server.js
module.exports = connectDB;
