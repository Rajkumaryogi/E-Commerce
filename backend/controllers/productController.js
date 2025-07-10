// This is a controller for handling product-related operations in an e-commerce application. 
const Product = require('../models/Product');


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
     const products = await Product.find({visibility: true}).lean();
     res.json(products);
   } catch (err) {
    res.status(500).json({ message: err.message });
  }
}