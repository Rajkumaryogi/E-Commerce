const Order = require('../models/Order');
const User = require('../models/User');

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.items.productId');
    
    if (!user || user.cart.items.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    const orderItems = user.cart.items.map(item => ({
      product: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price
    }));

    const totalAmount = orderItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );

    const order = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress: user.address || req.body.shippingAddress
    });

    await order.save();
    
    // Clear cart after order is placed
    user.cart.items = [];
    await user.save();

    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.product')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order belongs to the user
    if (order.user._id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Process payment
exports.processPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order belongs to the user
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // In a real app, you would integrate with a payment gateway here
    // This is just a simulation
    order.paymentStatus = 'paid';
    order.status = 'processing';
    await order.save();

    res.json({ message: 'Payment processed successfully', order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};