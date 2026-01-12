export const extractProductFilters = (query) => ({
    category: query.category,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    inStock: query.inStock
});
