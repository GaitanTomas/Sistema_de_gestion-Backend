import { createProductService, getProductsService, getProductByIdService, findProductByNameService, updateProductService, deleteProductService } from '../services/productService.js';

// Crear un nuevo producto
export const createProductController = async (req, res) => {
  try {
    const productData = req.body;
    const userId = req.user?._id || req.user?.id || req.user?.userId;
    const result = await createProductService(productData, userId);
    res.status(201).json(result);
  } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Obtener todos los producto
export const getProductsController = async (req, res) => {
  try {
    const products = await getProductsService();
    if (products.length === 0) {
      return res.status(200).json({ 
          message: "No se encontraron productos", 
          products: [] 
      });
    }
    res.status(200).json(products); 
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Obtener un producto por ID
export const getProductByIdController = async (req, res) => {
  try {
    const productID= req.params.id;
    const product = await getProductByIdService(productID);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Buscar productos por nombre (para barra de búsqueda)
export const findProductByNameController = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await findProductByNameService(name);
    res.status(200).json(products);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Actualizar un producto
export const updateProductController = async (req, res) => {
  try {
    const productID= req.params.id;
    const productData = req.body;
    const updatedProduct = await updateProductService(productID, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Eliminar un producto
export const deleteProductController = async (req, res) => {
  try {
    const productID= req.params.id;
    const result = await deleteProductService(productID);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
