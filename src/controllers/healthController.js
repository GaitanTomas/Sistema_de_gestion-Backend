import mongoose from "mongoose";

// Controlador para verificar el estado de salud del servidor y la base de datos
export const healthCheckController = (req, res) => {
  const dbState = mongoose.connection.readyState;

  // Mapeo de estados de la base de datos
  const dbStatusMap = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    };

  // Verificar si la base de datos está conectada
  const isDbUp = mongoose.connection.readyState === 1;
  // Responder con el estado de salud
  res.status(isDbUp ? 200 : 503).json({
      status: isDbUp ? "ok" : "degraded",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbStatusMap[dbState] || "unknown"
  });
};
