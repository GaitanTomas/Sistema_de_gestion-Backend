export const authorizeOwnerOrRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "No autorizado" });
      }

      const requesterRole = req.user.role;
      const requesterId = req.user.id;
      const targetId = req.params.id;

      // Si tiene un rol permitido → permitir
      if (allowedRoles.includes(requesterRole)) {
        return next();
      }

      // Si es el dueño del recurso → permitir
      if (String(requesterId) === String(targetId)) {
        return next();
      }

      return res.status(403).json({ message: "Permisos insuficientes" });

    } catch (err) {
      return res.status(500).json({
        message: "Error en autorización",
        error: err.message
      });
    }
  };
};
