import express from "express";
import { createCategoryController, getCategoryController, getCategoryByIdController, updateCategoryController, deleteCategoryController } from '../controllers/categoryController.js';
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

// Rutas públicas
router.get("/getCategory", getCategoryController);
router.get("/getCategoryById/:id", getCategoryByIdController);

// Rutas protegidas con JWT
router.post("/create",verifyTokenMiddleware, authorizeRoles('admin'), createCategoryController);
router.put("/updateCategory/:id", verifyTokenMiddleware, authorizeRoles('admin'), updateCategoryController);
router.delete("/deleteCategory/:id", verifyTokenMiddleware, authorizeRoles('admin'), deleteCategoryController);

export default router;