import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import { ApiError} from "../utils/apiError.js";

// Crear un nuevo producto
export const createProductService = async (productData, userId) => {
    const existingCategory = await Category.findById(productData.category);
    if (!existingCategory) throw ApiError.notFound("La categoría seleccionada no existe");
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
  const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true })
      .populate("category", "name")
      .populate("user", "name email");
  if (!updatedProduct) throw ApiError.notFound("Producto no encontrado");
  return { message: "Producto actualizado correctamente", updatedProduct };
}

// Eliminar un producto
export const deleteProductService = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if(!deletedProduct) throw ApiError.notFound("Producto no encontrado");
  return { message: "Producto eliminado correctamente" };
}
