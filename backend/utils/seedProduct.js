// This is the seedProduct.js file that seeds the database with initial product data for an e-commerce application.
const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();
const connectDB = require('../config/database');

//connect to the database
connectDB();

const products = [
    {
        order: 1,
        name: 'T-Shirt',
        visibility: true,
        description: 'Comfortable cotton t-shirt',
        price: 19.99,
        category: 'Clothing',
        stock: 100,
        imageUrl: 'https://example.com/tshirt.jpg'
    },
    {
        order: 2,
        name: 'Jeans',
        visibility: true,
        description: 'Stylish denim jeans',
        price: 39.99,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://example.com/jeans.jpg'
    },
    {
        order: 3,
        name: 'Sneakers',
        visibility: true,
        description: 'Trendy sneakers for everyday wear',
        price: 59.99,
        category: 'Footwear',
        stock: 75,
        imageUrl: 'https://example.com/sneakers.jpg'
    }
];


const seedProducts = async () => {
    try {
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('✅ Existing products cleared');

        // Insert new products
        const insertedProducts = await Product.insertMany(products);
        // console.log('✅ Products seeded:', insertedProducts);
        console.log('✅ Products seeded:');

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error seeding products:', error);
    }
};
seedProducts();
// This script connects to the MongoDB database, clears any existing products, and seeds it with initial product data.
// It uses the Mongoose library to interact with the database and the Product model to define the structure of the product documents.
// The products array contains sample product data that will be inserted into the database.
// After seeding, it closes the database connection.