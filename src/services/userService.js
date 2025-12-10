import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";      
import { SECRET } from "../config/config.js";
import { ApiError} from "../utils/apiError.js";

// Regex para email y contraseña
const emailRegex = /^\S+@\S+\.\S+$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;

// Registro de usuario
export const registerUserService = async (userData) => {
  // Validar email
  if (!emailRegex.test(userData.email)) {
      throw ApiError.badRequest("El email no tiene un formato válido");
  }
  // Validar contraseña
  if (!passwordRegex.test(userData.password)) {
      throw ApiError.badRequest(
          "La contraseña debe tener entre 6 y 12 caracteres, incluir una mayúscula, una minúscula y un número"
      );
  }
  // Validar email único
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
  // Eliminar campos vacíos
  Object.keys(userData).forEach((key) => {
      if (
          userData[key] === "" ||
          userData[key] === null ||
          userData[key] === undefined
      ) {
          delete userData[key];
      }
  });
  if (Object.keys(userData).length === 0) {
      throw ApiError.badRequest("No se enviaron datos válidos para actualizar");
  }
  // Validar email si se actualiza
  if (userData.email) {
      if (!emailRegex.test(userData.email)) throw ApiError.badRequest("El email no tiene un formato válido");
      const emailExistente = await User.findOne({ email: userData.email });
      if (emailExistente && emailExistente._id.toString() !== userId) {
          throw ApiError.badRequest("El email ya está registrado por otro usuario");
      }
  }
  // Validar y hashear password si se actualiza
  if (userData.password) {
    if (!passwordRegex.test(userData.password)) {
        throw ApiError.badRequest(
            "La contraseña debe tener entre 6 y 12 caracteres, incluir una mayúscula, una minúscula y un número"
        );
    }
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
  if (!emailRegex.test(adminData.email)) {
      throw ApiError.badRequest("El email no tiene un formato válido");
  }
  if (!passwordRegex.test(adminData.password)) {
      throw ApiError.badRequest("La contraseña debe tener entre 6 y 12 caracteres, incluir una mayúscula, una minúscula y un número");
  }
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
