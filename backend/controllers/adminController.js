const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
      return res.status(404).json({ message: 'To get AdminUser Login : First Logout the user side' });
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

// @desc    Forgot password admin user
// @route   POST /api/admin/forgot-password
const forgotPasswordAdminUser = async (req, res) => {
  try {
    const { email } = req.body;
    

    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide email" 
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "If this email exists, a password reset link will be sent"
      });
    }

    const token = jwt.sign(
      { id: checkUser._id, email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    // Store the reset token in the user document
    checkUser.resetPasswordToken = token;
    checkUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await checkUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.CLIENT_URL}/admin/reset-password/${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Admin Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3498db;">Password Reset Request</h2>
          <p>You requested a password reset for your admin account.</p>
          <p>Please click the button below to reset your password:</p>
          <a href="${resetLink}" 
             style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px;">
             Reset Password
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully"
    });

  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request"
    });
  }
};
  
const resetPasswordAdminUser = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verify token and find user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token. Please request a new password reset link."
      });
    }

    // Validate password
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Update password - this will trigger the pre-save hook to hash it
    user.password = password;
    
    // Explicitly mark password as modified
    user.markModified('password');
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully. You can now login with your new password."
    });

  } catch (error) {
    console.error("Password reset error:", error);
    
    let message = "Failed to reset password";
    if (error.name === 'TokenExpiredError') {
      message = "Password reset link has expired. Please request a new one.";
    } else if (error.name === 'JsonWebTokenError') {
      message = "Invalid password reset link.";
    }

    return res.status(400).json({
      success: false,
      message
    });
  }
};
module.exports = { 
  loginAdminUser,
  logoutAdminUser,
  verifyAdminUser,
  forgotPasswordAdminUser,
  resetPasswordAdminUser
};