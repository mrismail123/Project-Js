const Geolocalisation = require('../models/Geolocalisation');

// Ajouter une nouvelle géolocalisation
exports.ajouterGeolocalisation = async (req, res) => {
  try {
    const { utilisateur, examen, latitude, longitude } = req.body;
    const adresseIP = req.ip;

    const geo = new Geolocalisation({
      utilisateur,
      examen,
      latitude,
      longitude,
      adresseIP
    });

    await geo.save();
    res.status(201).json({ message: 'Géolocalisation enregistrée', geo });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'enregistrement de la géolocalisation', error: err.message });
  }
};

// Récupérer toutes les géolocalisations d’un examen
exports.getGeolocalisationsParExamen = async (req, res) => {
  try {
    const geoList = await Geolocalisation.find({ examen: req.params.examenId }).populate('utilisateur');
    res.status(200).json(geoList);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la récupération', error: err.message });
  }
};