const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifierToken = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (erreur) {
    console.error("Erreur d'authentification :", erreur);
    res.status(403).json({ message: "Token invalide ou expiré." });
  }
};