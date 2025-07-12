const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.warn(username, email, password);
  

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });
    console.log('New user created:', user);
    

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/login
const loginUser = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('cart.product');

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        cart: user.cart,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Logout user
// @route   POST /api/logout
const logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '24h',
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};