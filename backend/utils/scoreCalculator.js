// Fonction principale pour calculer le score
exports.calculerScore = (questions, reponsesEtudiant) => {
    let score = 0;
  
    questions.forEach((question) => {
      const reponse = reponsesEtudiant.find((r) => r.questionId === question._id.toString());
      if (!reponse) return;
  
      if (question.type === "qcm") {
        // Vérifier si toutes les bonnes réponses sont sélectionnées
        const reponsesCorrectes = question.bonneReponse.sort().join(",");
        const reponsesEtudiant = (reponse.valeurs || []).sort().join(",");
        if (reponsesCorrectes === reponsesEtudiant) {
          score += question.note; // Ajoute la note de la question
        }
      } else if (question.type === "directe") {
        // Vérifier la réponse texte directe en prenant en compte la tolérance
        const attendu = question.reponseText.trim().toLowerCase();
        const donné = (reponse.valeur || "").trim().toLowerCase();
  
        // Calculer la distance entre la réponse donnée et la réponse attendue
        const tolerance = question.tolerance || 0;
        const distance = levenshteinDistance(attendu, donné);
        const pourcentageErreur = (distance / attendu.length) * 100;
  
        // Ajouter la note si la distance d'erreur est sous le seuil de tolérance
        if (pourcentageErreur <= tolerance) {
          score += question.note;
        }
      }
    });
  
    return score;
  };
  
  // Fonction utilitaire pour calculer la distance de Levenshtein (similitude des chaînes de caractères)
  function levenshteinDistance(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
    );
  
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cout = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cout
        );
      }
    }
  
    return matrix[a.length][b.length];
  }