const express = require('express');
const router = express.Router();
const Etudiant = require('../models/Etudiant');
const bcrypt = require('bcryptjs');

// 📌 route: inscription étudiant
router.post('/signup', async (req, res) => {
  const { nom, email, motDePasse } = req.body;

  try {
    // تشفير كلمة السر
    const hashedPwd = await bcrypt.hash(motDePasse, 10);

    // إنشاء طالب جديد
    const newEtudiant = new Etudiant({
      nom,
      email,
      motDePasse: hashedPwd
    });

    // حفظ الطالب فـ MongoDB
    await newEtudiant.save();

    res.status(201).json({ message: '✅ Compte créé avec succès !' });
  } catch (err) {
    res.status(500).json({ error: '❌ Erreur lors de la création du compte.' });
  }
});

module.exports = router;
