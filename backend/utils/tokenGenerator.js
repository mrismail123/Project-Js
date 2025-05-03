// backend/utils/tokenGenerator.js

const jwt = require("jsonwebtoken");

exports.genererToken = (utilisateur) => {
  const payload = {
    id: utilisateur._id,
    type: utilisateur.type
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};