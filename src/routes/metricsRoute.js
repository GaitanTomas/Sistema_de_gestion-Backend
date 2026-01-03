import express from "express";
import { metricsController } from "../controllers/metricsController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/", verifyTokenMiddleware, authorizeRoles("admin"), metricsController);

export default router;
