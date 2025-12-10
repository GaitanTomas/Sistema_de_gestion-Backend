import Category from '../models/categoryModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { ApiError} from "../utils/apiError.js";

// Crear un nuevo producto
export const createProductService = async (productData, userId) => {
    // Validar que el usuario creador exista
    const existingUser = await User.findById(userId);
    if (!existingUser) throw ApiError.notFound("El usuario creador no existe");
    // Validar que la categoría exista
    const existingCategory = await Category.findById(productData.category);
    if (!existingCategory) throw ApiError.notFound("La categoría seleccionada no existe");
    // Validaciones numéricas
    if (typeof productData.price !== "number" || productData.price < 0) {
        throw ApiError.badRequest("El precio debe ser un número mayor o igual a 0");
    }
    if (typeof productData.stock !== "number" || productData.stock < 0) {
        throw ApiError.badRequest("El stock debe ser un número mayor o igual a 0");
    }
    productData.user = userId;
    const newProduct = new Product(productData);
    await newProduct.save();
    return { message: "Producto creado correctamente", product: newProduct };
};

// Obtener todos los producto
export const getProductsService = async () => {
    const products = await Product.find()
        .populate("category", "name")
        .populate("user", "name lastName email");
    if (products.length === 0) {
    return [];
    }
    return products;
};

// Obtener un producto por ID
export const getProductByIdService = async (productId) => {
    const product = await Product.findById(productId)
        .populate("category", "name")
        .populate("user", "name email");
    if (!product) throw ApiError.notFound("Producto no encontrado");
    return product;
};

// Buscar productos por nombre (para barra de búsqueda)
export const findProductByNameService = async (name) => {
    const products = await Product.find({
        name: { $regex: name, $options: "i" }
    }).populate("category").populate("user", "name email");
    if (!products || products.length === 0) throw ApiError.notFound(`No se encontraron productos que coincidan con "${name}"`);
    return products;
};

// Actualizar un producto
export const updateProductService = async (productId, productData) => {
    // Eliminar campos vacíos
    Object.keys(productData).forEach((key) => {
        if (
            productData[key] === "" || 
            productData[key] === null || 
            productData[key] === undefined
        ) {
            delete productData[key];
        }
    });
    // Verificar si hay datos para actualizar
    if (Object.keys(productData).length === 0) {
        throw ApiError.badRequest("No se enviaron datos válidos para actualizar");
    }
    // Sanitiza campos de texto
    if (productData.name) productData.name = productData.name.trim().toLowerCase();
    if (productData.description) productData.description = productData.description.trim().toLowerCase();
    // Validaciones numéricas
    if (productData.price !== undefined) {
        if (typeof productData.price !== "number" || productData.price < 0) {
            throw ApiError.badRequest("El precio debe ser un número mayor o igual a 0");
        }
    }
    if (productData.stock !== undefined) {
        if (typeof productData.stock !== "number" || productData.stock < 0) {
            throw ApiError.badRequest("El stock debe ser un número mayor o igual a 0");
        }
    }
    // Validar categoría si se envió
    if (productData.category) {
        const existingCategory = await Category.findById(productData.category);
        if (!existingCategory) throw ApiError.notFound("La categoría seleccionada no existe");
    }
    // Actualizar producto con validaciones activadas
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true, runValidators: true }
    )
        .populate("category", "name")
        .populate("user", "name email");
    if (!updatedProduct) throw ApiError.notFound("Producto no encontrado");
    return { message: "Producto actualizado correctamente", updatedProduct };
};

// Eliminar un producto
export const deleteProductService = async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if(!deletedProduct) throw ApiError.notFound("Producto no encontrado");
    return { message: "Producto eliminado correctamente" };
}
