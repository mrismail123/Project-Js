const verifierRole = (roles) => {
    return (req, res, next) => {
      // Vérification du rôle de l'utilisateur dans req.user qui a été rempli dans verifierJWT
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Accès refusé: rôle insuffisant."
        });
      }
      next();
    };
  };
  
  module.exports = verifierRole;