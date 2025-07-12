const jwt = require('jsonwebtoken');
const User = require('../models/AdminUser');

// @desc    Authenticate user & get token
// @route   POST /api/login
const loginAdminUser = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        Admin: user.Admin,
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
const logoutAdminUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '24h',
  });
};

module.exports = {
  loginAdminUser,
  logoutAdminUser,
};