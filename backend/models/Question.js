const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },
  type: {
    type: String,
    enum: ["qcm", "directe"],
    required: true
  },
  enonce: { type: String, required: true },
  media: { type: String }, // chemin vers une image/vidéo/audio (optionnel)

  // QCM spécifique
  options: [String],
  bonneReponse: [String], // pour QCM: tableau des bonnes réponses

  // Directe spécifique
  reponseText: { type: String }, // pour question directe
  tolerance: { type: Number }, // en pourcentage (ex: 10)

  duree: { type: Number, required: true }, // en secondes
  note: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Question", questionSchema);