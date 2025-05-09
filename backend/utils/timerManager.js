// Cette fonction démarre un timer pour un examen avec une durée définie en minutes.
// Elle retourne la date/heure de fin prévue.
function demarrerTimer(dureeEnMinutes) {
    const maintenant = new Date();
    const fin = new Date(maintenant.getTime() + dureeEnMinutes * 60000); // convertir en ms
    return fin;
  }
  
  // Cette fonction vérifie si l'heure actuelle dépasse la date de fin.
  function estExpire(dateFin) {
    const maintenant = new Date();
    return maintenant > new Date(dateFin);
  }
  
  // Cette fonction retourne le temps restant en secondes.
  function tempsRestant(dateFin) {
    const maintenant = new Date();
    const restant = new Date(dateFin) - maintenant;
    return Math.max(Math.floor(restant / 1000), 0);
  }
  
  module.exports = {
    demarrerTimer,
    estExpire,
    tempsRestant
  };