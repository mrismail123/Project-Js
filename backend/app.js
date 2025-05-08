// Importation d'Express
const express = require('express');

// Création de l'application Express
const app = express();

// Configuration du port (sera surchargé par server.js)
const PORT = 3000;

// Route principale
app.get('/', (req, res) => {
    res.send('Bienvenue sur la Plateforme d\'Examen !');
});

// Exportation de l'application pour utilisation dans server.js
module.exports = app;