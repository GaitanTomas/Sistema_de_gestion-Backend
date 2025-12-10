import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";      
import { SECRET } from "../config/config.js";
import { ApiError} from "../utils/apiError.js";

// Registro de usuario
export const registerUserService = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw ApiError.badRequest("El email ya está registrado");
    // Asignar rol por defecto
    const safeUserData = { ...userData, role: 'user' };
    // Crear nuevo usuario
    const newUser = new User(safeUserData);
    await newUser.save();
    return { message: "Usuario creado correctamente", userId: newUser._id };
};

// Login de usuario
export const loginUserService = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) throw ApiError.notFound("Usuario no encontrado");
    const passwordCorrecta = bcrypt.compareSync(password, user.password);
    if (!passwordCorrecta) throw ApiError.unauthorized("Contraseña incorrecta");
    // Token JWT
    const payload = {
      userId: user._id,
      userEmail: user.email,
      role: user.role
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });
    return { message: "Inicio de sesión exitoso", token, user: { id: user._id, email: user.email, role: user.role }};
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
    if (!user) throw ApiError.notFound("Usuario no encontrado");
    return user;
};

// Actualizar un usuario
export const updateUserService = async (userId, userData) => {
    if (userData.password) {
        userData.password = bcrypt.hashSync(userData.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true }).select("-password");
    if (!updatedUser) throw ApiError.notFound("Usuario no encontrado");
    return updatedUser;
};

// Eliminar un usuario
export const deleteUserService = async (userId) => {
    const usuarioEliminado = await User.findByIdAndDelete(userId);
    if (!usuarioEliminado) throw ApiError.notFound("Usuario no encontrado");
    return { mensaje: "Usuario eliminado correctamente" };
};

// Crear admin (solo si viene de un admin)
export const createAdminService = async (adminData) => {
  const existingUser = await User.findOne({ email: adminData.email });
  if (existingUser) throw ApiError.badRequest("El email ya está registrado");
  const newAdmin = new User({
    name: adminData.name,
    lastName: adminData.lastName,
    email: adminData.email,
    password: bcrypt.hashSync(adminData.password, 10),
    role: "admin"
  });
  await newAdmin.save();
  return { message: "Administrador creado correctamente", adminId: newAdmin._id };
};
