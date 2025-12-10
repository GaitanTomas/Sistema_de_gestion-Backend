import Category from "../models/categoryModel.js";
import { ApiError} from "../utils/apiError.js";

// Crear una nueva categoría
export const createCategoryService = async (categoryData) => {
    const existingCategory = await Category.findOne({ name: categoryData.name });
    if (existingCategory) throw ApiError.badRequest("La categoría ya existe");
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
    if (!category) throw ApiError.notFound("Categoría no encontrada");
    return category;
};

// Actualizar una categoría
export const updateCategoryService = async (categoryId, categoryData) => {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    if (!updatedCategory) throw ApiError.notFound("Categoría no encontrada")
    return updatedCategory;
};

// Eliminar una categoría
export const deleteCategoryService = async (categoryId) => {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
      if (!deletedCategory) throw ApiError.notFound("Categoría no encontrada");
    return {message: "Categoría eliminada correctamente"};
};