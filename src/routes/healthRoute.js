import express from "express";
import { healthCheckController } from "../controllers/healthController.js";

const router = express.Router();

router.get("/", healthCheckController);

export default router;