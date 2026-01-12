import { createProductService, getProductsService, getProductByIdService, findProductByNameService, updateProductService, deleteProductService } from '../services/productService.js';
import { catchAsync } from '../utils/catchAsync.js';
import { extractProductFilters } from '../utils/extractProductFilters.js';

// Crear un nuevo producto
export const createProductController = catchAsync(async (req, res) => {
    const userId = req.user?._id || req.user?.id || req.user?.userId;
    const result = await createProductService(req.body, userId);
    res.status(201).json(result);
});

// Obtener todos los producto
export const getProductsController = catchAsync(async (req, res) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const sort = req.query.sort;
    const filters = extractProductFilters(req.query);

    const data = await getProductsService(page, limit, sort, filters);

    res.status(200).json({
        status: "success",
        ...data
    });
});

// Obtener un producto por ID
export const getProductByIdController = catchAsync(async (req, res) => {
    const product = await getProductByIdService(req.params.id);
    res.status(200).json(product);
});

// Buscar productos por nombre (para barra de búsqueda)
export const findProductByNameController = catchAsync(async (req, res) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const sort = req.query.sort;
    const filters = extractProductFilters(req.query);

    const data = await findProductByNameService(req.query.name, page, limit, sort, filters);

    res.status(200).json({
        status: "success",
        ...data
    });
});

// Actualizar un producto
export const updateProductController = catchAsync(async (req, res) => {
    const data = { ...req.body };
    // Sanitiza campos de texto
    if (data.name) data.name = data.name.trim().toLowerCase();
    if (data.description) data.description = data.description.trim().toLowerCase();
    const result = await updateProductService(req.params.id, data);
    res.status(200).json(result);
});


// Eliminar un producto
export const deleteProductController = catchAsync(async (req, res) => {
    const result = await deleteProductService(req.params.id);
    res.status(200).json(result);
});
