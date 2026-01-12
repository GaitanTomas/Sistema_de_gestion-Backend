export const buildProductFilters = (filters) => {
    const query = {};

    // Filtro por categoría
    if (filters.category) {
        query.category = filters.category;
    }

    // Filtro por rango de precios
    if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
        if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }

    // Filtro por stock
    if (filters.inStock !== undefined) {
        if (filters.inStock === "true") {
            query.stock = { $gt: 0 };
        }
        if (filters.inStock === "false") {
            query.stock = { $eq: 0 };
        }
    }

    return query;
};
