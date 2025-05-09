const express = require('express');
const router = express.Router();
const geoController = require('../controllers/geolocalisationController');

// Ajouter une géolocalisation
router.post('/', geoController.ajouterGeolocalisation);

// Récupérer les géolocalisations d’un examen
router.get('/:examenId', geoController.getGeolocalisationsParExamen);

module.exports = router;