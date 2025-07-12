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


// @desc    Verify admin user
// @route   GET /api/admin/verify
const verifyAdminUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      Admin: user.Admin,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = {
  loginAdminUser,
  logoutAdminUser,
  verifyAdminUser
};