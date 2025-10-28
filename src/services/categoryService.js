import Category from "../models/categoryModel.js";

// Crear una nueva categoría
export const createCategoryService = async (categoryData) => {
    const existingCategory = await Category.findOne({ name: categoryData.name });
    if (existingCategory) {
      const error = new Error("Esta categoría ya existe");
      error.statusCode = 400;
      throw error;
    }
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return { message: "Categoría creada correctamente"}
};

// Obtener todas las categorías
export const getCategoryService = async () => {
    const categories = await Category.find();
    if(categories.length === 0){
      return [];
    }
    return categories
};

// Obtener una categoría por ID
export const getCategoryByIdService = async (categoryId) => {
    const category = await Category.findById(categoryId);
    if (!category) {
        const error = new Error("Categoría no encontrada")
        error.statusCode = 404
        throw error
    }
    return category;
};

// Actualizar una categoría
export const updateCategoryService = async (categoryId, categoryData) => {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    if (!updatedCategory) {
      const error = new Error("Categoría no encontrada")
      error.statusCode = 404
      throw error
    }
    return updatedCategory;
};

// Eliminar una categoría
export const deleteCategoryService = async (categoryId) => {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
      const error = new Error("Categoría no encontrada")
      error.statusCode = 404
      throw error
    }
    return {message: "Categoría eliminada correctamente"};
};