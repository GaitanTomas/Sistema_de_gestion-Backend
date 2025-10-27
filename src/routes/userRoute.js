import express from "express";
import { registerUserController, loginUserController, getUsersController, getUserByIdController, updateUserController, deleteUserController } from "../controllers/userController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

const router = express.Router();

// Rutas públicas
router.post("/register", registerUserController);
router.post("/login", loginUserController);

// Rutas protegidas con JWT
router.get("/getUsers", verifyTokenMiddleware, getUsersController);
router.get("/getUsersById/:id", verifyTokenMiddleware, getUserByIdController);
router.put("/updateUser/:id", verifyTokenMiddleware, updateUserController);
router.delete("/deleteUser/:id", verifyTokenMiddleware, deleteUserController);

export default router;
