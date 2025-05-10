const multer = require("multer");
const path = require("path");

// Définir l'emplacement de stockage et le nom de fichier
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Crée un dossier "uploads" à la racine du projet
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extraire l'extension (ex: .jpg, .mp4)
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, filename);
  }
});

// Filtrer les types de fichiers autorisés
const fileFilter = (req, file, cb) => {
  const typesAutorises = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const extname = typesAutorises.test(path.extname(file.originalname).toLowerCase());
  const mimetype = typesAutorises.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non supporté"), false);
  }
};

// Configuration de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Limite de 20 Mo
  fileFilter: fileFilter
});

module.exports = upload;
