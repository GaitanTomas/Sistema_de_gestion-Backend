import mongoose from "mongoose";
import { getMetricsData } from "../middleware/metrics.js";

export const metricsController = (req, res) => {
    const dbState = mongoose.connection.readyState;

    const dbStatusMap = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting"
    };

    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
        database: dbStatusMap[dbState] || "unknown",
        metrics: getMetricsData()
    });
};
