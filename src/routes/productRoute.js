import express from "express";
import { createProductController, getProductsController, getProductByIdController, findProductByNameController, updateProductController, deleteProductController } from '../controllers/productController.js';
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

// Rutas públicas
router.get("/getProducts", getProductsController);
router.get("/getProductById/:id", getProductByIdController);
router.get("/search", findProductByNameController);

// Rutas protegidas con JWT
router.post("/create", verifyTokenMiddleware, authorizeRoles('admin'), createProductController);
router.put("/updateProduct/:id", verifyTokenMiddleware, authorizeRoles('admin'), updateProductController);
router.delete("/deleteProduct/:id", verifyTokenMiddleware, authorizeRoles('admin'), deleteProductController);

export default router;