// Fonction pour obtenir le timestamp actuel en secondes
function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }
  
  // Fonction pour calculer le temps restant en secondes
  function getRemainingTime(startTime, duration) {
    const now = getCurrentTimestamp();
    const elapsed = now - startTime;
    const remaining = duration - elapsed;
    return remaining > 0 ? remaining : 0;
  }
  
  // Vérifie si le temps est expiré
  function isTimeExpired(startTime, duration) {
    return getRemainingTime(startTime, duration) === 0;
  }
  
  module.exports = {
    getCurrentTimestamp,
    getRemainingTime,
    isTimeExpired,
  };