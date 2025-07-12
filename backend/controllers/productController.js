// This is a controller for handling product-related operations in an e-commerce application. 
const Product = require('../models/Product');


// Get all products
const getAllProducts = async (req, res) => {
    try {
     const products = await Product.find({visibility: true}).sort({order:1}).lean();
     res.json(products);
   } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts, 
  getProductById,
  // Other product-related functions can be added here
};

