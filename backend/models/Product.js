// this is model for product and it is used to define the schema for products in the database
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    order:{
        type: Number,
        required: true,
        unique: true, // Ensures each product has a unique order number
        min: 0, // Order numbers should be non-negative
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    visibility: {
        type: Boolean,
        default: true, // Products are visible by default
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
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    imageUrl: {
        type: String,
        required: false, // Optional field
    },
}, { timestamps: true });
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
// This model can be used in routes to create, read, update, and delete products in the database.