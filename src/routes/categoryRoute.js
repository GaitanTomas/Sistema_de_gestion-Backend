import express from "express";
import { createCategoryController, getCategoryController, getCategoryByIdController, updateCategoryController, deleteCategoryController } from '../controllers/categoryController.js';
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/getCategory", getCategoryController);
router.get("/getCategoryById/:id", getCategoryByIdController);

// Rutas protegidas con JWT
router.post("/create",verifyTokenMiddleware, createCategoryController);
router.put("/updateCategory/:id", verifyTokenMiddleware, updateCategoryController);
router.delete("/deleteCategory/:id", verifyTokenMiddleware, deleteCategoryController);

export default router;