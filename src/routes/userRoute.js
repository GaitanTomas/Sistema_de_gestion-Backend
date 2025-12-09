import express from "express";
import { registerUserController, loginUserController, createAdminController, getUsersController, getUserByIdController, updateUserController, deleteUserController } from "../controllers/userController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { authorizeOwnerOrRoles } from "../middleware/authorizeOwnerOrRoles.js";

const router = express.Router();

// Rutas públicas
router.post("/register", registerUserController);
router.post("/login", loginUserController);

// Rutas protegidas con JWT
router.post("/createAdmin", verifyTokenMiddleware, authorizeRoles('admin'), createAdminController);
router.get("/getUsers", verifyTokenMiddleware, authorizeRoles('admin'), getUsersController);
router.get("/getUserById/:id", verifyTokenMiddleware, authorizeOwnerOrRoles('admin'), getUserByIdController);
router.put("/updateUser/:id", verifyTokenMiddleware, authorizeOwnerOrRoles('admin'), updateUserController);
router.delete("/deleteUser/:id", verifyTokenMiddleware, authorizeOwnerOrRoles('admin'), deleteUserController);

export default router;
