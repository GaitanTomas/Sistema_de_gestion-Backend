import express from "express";
import { createProductController, getProductsController, getProductByIdController, findProductByNameController, updateProductController, deleteProductController } from '../controllers/productController.js';
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/getProducts", getProductsController);
router.get("/getProductById/:id", getProductByIdController);
router.get("/search", findProductByNameController);

// Rutas protegidas con JWT
router.post("/create", verifyTokenMiddleware, createProductController);
router.put("/updateProduct/:id", verifyTokenMiddleware, updateProductController);
router.delete("/deleteProduct/:id", verifyTokenMiddleware, deleteProductController);

export default router;