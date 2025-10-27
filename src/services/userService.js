import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";      
import { SECRET } from "../config/config.js";  

// Registro de usuario
export const registerUserService = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Este email ya se encuentra registrado")
    }
    const newUser = new User(userData);
    await newUser.save();
    return { message: "Usuario creado correctamente" }
};

// Login de usuario
export const loginUserService = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }
    const passwordCorrecta = bcrypt.compareSync(password, user.password);
    if (!passwordCorrecta) {
      const error = new Error("Contraseña incorrecta");
      error.statusCode = 401;
      throw error;
    }
    // Token JWT
    const payload = {
      userId: user._id,
      userEmail: user.email
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });
    return { message: "Inicio de sesión exitoso", token }
};

// Obtener todos los usuarios
export const getUsersService = async () => {
    const users = await User.find().select("-password")
    if(users.length === 0){
      return [];
    }
    return users
}

// Obtener un usuario por ID
export const getUserByIdService = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user) {
        const error = new Error("Usuario no encontrado")
        error.statusCode = 404
        throw error
    }
    return user;
};

// Actualizar un usuario
export const updateUserService = async (userId, userData) => {
    if (userData.password) {
        userData.password = bcrypt.hashSync(userData.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true }).select("-password");
    if (!updatedUser) {
        const error = new Error("Usuario no encontrado")
        error.statusCode = 404
        throw error
    }
    return updatedUser;
};

// Eliminar un usuario
export const deleteUserService = async (userId) => {
    const usuarioEliminado = await User.findByIdAndDelete(userId);
    if (!usuarioEliminado) {
        const error = new Error("Usuario no encontrado")
        error.statusCode = 404
        throw error    
    }
    return { mensaje: "Usuario eliminado correctamente" };
};
