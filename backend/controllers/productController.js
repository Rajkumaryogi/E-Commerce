// This is a controller for handling product-related operations in an e-commerce application. 
const Product = require('../models/Product');

let cachedProductData = null;
let lastFetchTime = 0;

// Get all products
exports.getAllProducts = async (req, res) => {
    const cacheDuration = 5 * 60 * 1000; // 5 minutes
    const now = Date.now();
    
    if (cachedProductData && now - lastFetchTime < cacheDuration) {
        return cachedProductData;
    }

    try {
        const products = await Product.find({ visibility: true }).sort({ order: 1 }).lean();
        res.status(200).json(products);
        // console.log({products});
        return cachedProductData;

    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
        console.error("Error fetching product:", error);
        return [];
    }
};