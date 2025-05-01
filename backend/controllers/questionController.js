exports.ajouterQuestion = async (req, res) => {
    try {
      const {
        type,
        enonce,
        media,
        options,
        bonneReponse,
        reponseText,
        tolerance,
        duree,
        note,
        examenId
      } = req.body;
  
      // Vérifier que la durée et la note sont bien fournies
      if (!type || !enonce || !duree || !note || !examenId) {
        return res.status(400).json({ message: "Champs requis manquants (durée ou note)." });
      }
  
      const nouvelleQuestion = new Question({
        type,
        enonce,
        media,
        options,
        bonneReponse,
        reponseText,
        tolerance,
        duree,
        note,
        examenId
      });
  
      await nouvelleQuestion.save();
      res.status(201).json({ message: "Question ajoutée avec succès." });
    } catch (erreur) {
      console.error("Erreur lors de l'ajout de la question :", erreur);
      res.status(500).json({ message: "Erreur serveur." });
    }
  };