export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "No autorizado" });
      }
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Permisos insuficientes" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: "Error en autorización", error: err.message });
    }
  };
};
