const User = require('../models/User');
const Product = require('../models/Product');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.items.productId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user.id);
    const itemIndex = user.cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex >= 0) {
      // Product exists in cart, update quantity
      user.cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      user.cart.items.push({ productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const user = await User.findById(req.user.id);
    const itemIndex = user.cart.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex < 0) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    user.cart.items[itemIndex].quantity = quantity;
    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user.id);
    user.cart.items = user.cart.items.filter(
      item => item._id.toString() !== itemId
    );

    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart.items = [];
    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};