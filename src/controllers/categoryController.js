import { createCategoryService, getCategoryService, getCategoryByIdService, updateCategoryService, deleteCategoryService } from '../services/categoryService.js';
import { catchAsync } from '../utils/catchAsync.js';

// Crear una nueva categoría
export const createCategoryController = catchAsync(async (req, res) => {
    const result = await createCategoryService(req.body);
    res.status(201).json(result);
});

// Obtener todas las categorías
export const getCategoryController = catchAsync(async (req, res) => {
    const categories = await getCategoryService();
    res.status(200).json({
        message: categories.length === 0 ? "No se encontraron categorías" : undefined,
        categories
    });
});

// Obtener una categoría por ID
export const getCategoryByIdController = catchAsync(async (req, res) => {
    const category = await getCategoryByIdService(req.params.id);
    res.status(200).json(category);
});

// Actualizar una categoría
export const updateCategoryController = catchAsync(async (req, res) => {
    const data = { ...req.body };
    // Sanitiza campos de texto antes de actualizar
    if (data.name) data.name = data.name.trim().toLowerCase();
    if (data.description) data.description = data.description.trim().toLowerCase();
    const category = await updateCategoryService(req.params.id, data);
    res.status(200).json(category);
});

// Eliminar una categoría
export const deleteCategoryController = catchAsync(async (req, res) => {
    const result = await deleteCategoryService(req.params.id);
    res.status(200).json(result);
});

