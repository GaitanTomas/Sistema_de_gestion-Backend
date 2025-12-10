export const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);

    // ApiError personalizados
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    // Errores de MongoDB
    if (err.name === "CastError") {
        return res.status(400).json({
            status: "error",
            message: "ID inválido o formato incorrecto"
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            status: "error",
            message: "Registro duplicado"
        });
    }

    // Errores desconocidos
    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
        details: err.message
    });
};
