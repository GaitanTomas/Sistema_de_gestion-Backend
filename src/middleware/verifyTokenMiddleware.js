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
    // decoded debe contener userId, userEmail, role
    req.user = {
        id: decoded.userId,
        email: decoded.userEmail,
        role: decoded.role
    };
    next();
    } catch (err) {
    return res.status(401).json({ message: "Token de acceso inválido", error: err.message });
    }
};
