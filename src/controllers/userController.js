import { registerUserService, loginUserService, createAdminService, getUsersService, getUserByIdService, updateUserService, deleteUserService } from "../services/userService.js";
import { catchAsync } from "../utils/catchAsync.js";

// Registro de usuario
export const registerUserController = catchAsync(async (req, res) => {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
});

// Login de usuario
export const loginUserController = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await loginUserService(email, password);
    res.status(200).json(result);
});

// Obtener todos los usuarios
export const getUsersController = catchAsync(async (req, res) => {
    const users = await getUsersService();
    res.status(200).json({
        message: users.length === 0 ? "No hay usuarios registrados" : undefined,
        users,
    });
});

// Obtener un usuario por ID
export const getUserByIdController = catchAsync(async (req, res) => {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json(user);
});

// Actualizar un usuario
export const updateUserController = catchAsync(async (req, res) => {
    const data = { ...req.body };
    // Sanitiza manualmente los campos de texto
    if (data.name) data.name = data.name.trim().toLowerCase();
    if (data.lastName) data.lastName = data.lastName.trim().toLowerCase();
    if (data.email) data.email = data.email.trim().toLowerCase();
    // Llamamos al service que haga el update con runValidators
    const updatedUser = await updateUserService(req.params.id, data, { runValidators: true });
    res.status(200).json(updatedUser);
});

// Eliminar un usuario
export const deleteUserController = catchAsync(async (req, res) => {
    const result = await deleteUserService(req.params.id);
    res.status(200).json(result);
});

// Crear un administrador
export const createAdminController = catchAsync(async (req, res) => {
    const result = await createAdminService(req.body);
    res.status(201).json(result);
});
