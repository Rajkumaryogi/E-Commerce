const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Never show password in output
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity cannot be less than 1']
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    totalPrice: {
      type: Number,
      default: 0
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// Middleware to hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Update passwordChangedAt when password is modified
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // Ensure token is created after
  next();
});

// Update cart timestamp when modified
userSchema.pre('save', function(next) {
  if (this.isModified('cart')) {
    this.cart.updatedAt = Date.now();
  }
  next();
});

// Calculate total price before saving cart
userSchema.pre('save', async function(next) {
  if (this.isModified('cart.items')) {
    const populatedUser = await this.populate('cart.items.productId');
    this.cart.totalPrice = populatedUser.cart.items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);
  }
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password changed after token was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Query middleware to filter out inactive users
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// Virtual for formatted address
userSchema.virtual('formattedAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}, ${this.address.country}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;