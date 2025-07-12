const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
    unique: true,
    min: 0,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Accessories', 'Footwear', 'Kids'], // ✅ Add this enum
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
  },
  seller: {
    type: String,
    required: false, // ✅ Make optional or provide value in seed data
  },
  brand: {
    type: String,
    required: false, // ✅ Make optional or provide value in seed data
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
