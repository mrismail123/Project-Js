// Middleware pour enregistrer les coordonnées géographiques
exports.enregistrerGeoLocalisation = (req, res, next) => {
    const { latitude, longitude } = req.body;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Coordonnées géographiques manquantes." });
    }
  
    req.geoLocation = {
      lat: parseFloat(latitude),
      lon: parseFloat(longitude)
    };
  
    next();
  };