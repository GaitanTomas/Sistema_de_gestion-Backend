import rateLimit from "express-rate-limit";

// Límite general para TODA la API
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 300, // Máximo 300 requests por IP
    standardHeaders: true, 
    legacyHeaders: false,
    handler: (req, res, next) => {
        return res.status(429).json({
            status: "error",
            message: "Demasiadas solicitudes desde esta IP, intenta nuevamente en 15 minutos"
        });
    }
});

// Límite para login
export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 5, // solo 5 intentos de login por IP
    handler: (req, res, next) => {
        return res.status(429).json({
            status: "error",
            message: "Demasiados intentos de login, intenta nuevamente en 10 minutos"
        });
    }
});
