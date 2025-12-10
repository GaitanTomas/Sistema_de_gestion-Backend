import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.js';

export const verifyTokenMiddleware = (req, res, next) => {
    try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Token de acceso no proporcionado" });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);

    req.user = {
        id: decoded.userId,
        email: decoded.userEmail,
        role: decoded.role
    };

    next();

    } catch (err) {

    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
        message: "El token ha expirado",
        expiredAt: err.expiredAt
        });
    }

    if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
        message: "Token mal formado o firma inválida"
        });
    }

    if (err instanceof jwt.NotBeforeError) {
        return res.status(401).json({
        message: "El token aún no es válido",
        date: err.date
        });
    }

    // Cualquier otro error inesperado
    return res.status(500).json({
        message: "Error interno al validar el token",
        error: err.message
    });
    }
};
