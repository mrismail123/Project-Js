module.exports = (req, res, next) => {
    const { nom, email, motDePasse } = req.body;
  
    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
  
    // Vérification simple de l'email
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
      return res.status(400).json({ message: "Email invalide." });
    }
  
    if (motDePasse.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères." });
    }
  
    next();
  };