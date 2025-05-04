const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  texte: { type: String, required: true }, // Le texte de la question
  type: { type: String, enum: ["texte", "qcm"], default: "texte" }, // Le type de question : texte libre ou QCM
  options: [{ type: String }], // Les choix possibles pour un QCM
  bonneReponse: { type: String }, // La bonne réponse pour un QCM
  note: { type: Number, default: 1 }, // La note attribuée à la question
  duree: { type: Number, default: 60 }, // La durée allouée pour répondre (en secondes)
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true } // L'identifiant de l'examen lié
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

module.exports = mongoose.model("Question", questionSchema);