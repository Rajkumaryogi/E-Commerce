const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/addToCart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if product already in cart
    const existingItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      user.cart[existingItemIndex].quantity += quantity || 1;
    } else {
      // Add new item to cart
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    
    res.json(updatedUser.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove item from cart
// @route   POST /api/cart/removeFromCart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  console.warn("removeFromCart called with productId:", productId);
  

  try {
    const user = await User.findById(req.user._id);
    // Filter out the product to remove
    user.cart = user.cart.filter(
      item => item._id.toString() !== productId
    );

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    
    res.json(updatedUser.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};