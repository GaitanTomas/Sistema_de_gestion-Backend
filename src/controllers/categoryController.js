import { createCategoryService, getCategoryService, getCategoryByIdService, updateCategoryService, deleteCategoryService } from '../services/categoryService.js';

// Crear una nueva categoría
export const createCategoryController = async (req, res) => {
    try {
        const categoryData = req.body;
        const result = await createCategoryService(categoryData);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Obtener todas las categorías
export const getCategoryController = async (req, res) => {
    try {
        const categories = await getCategoryService();
        if (categories.length === 0) {
            return res.status(200).json({ 
                message: "No se encontraron categorías", 
                categories: [] 
            });
        }
        return res.status(200).json(categories);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Obtener una categoría por ID
export const getCategoryByIdController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryByIdService(categoryId);
        res.status(200).json(category);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Actualizar una categoría
export const updateCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryData = req.body; 
        const updatedCategory = await updateCategoryService(categoryId, categoryData);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

// Eliminar una categoría
export const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const result = await deleteCategoryService(categoryId);
        res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

