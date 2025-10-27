import { registerUserService, loginUserService, getUsersService, getUserByIdService, updateUserService, deleteUserService } from "../services/userService.js";

// Registro de usuario
export const registerUserController = async (req, res) => {
    try {
        const userData = req.body;
        const result = await registerUserService(userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Login de usuario
export const loginUserController = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await loginUserService(email, password);
        res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message }); 
    }
};

// Obtener todos los usuarios
export const getUsersController = async (req, res) => {
    try {
        const users = await getUsersService();
        if (users.length === 0) {
            return res.status(200).json({ 
                message: "No hay usuarios registrados", 
                users: [] 
            });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
export const getUserByIdController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserByIdService(userId);
        res.status(200).json(user);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Actualizar un usuario
export const updateUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body; 
        const updatedUser = await updateUserService(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Eliminar un usuario
export const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await deleteUserService(userId);
        res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};
