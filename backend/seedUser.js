const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');

const connectDB = require('./config/database');

// Database connection
connectDB();

// Clear existing users and products
const cleanCollections = async () => {
  await User.deleteMany();
  await Product.deleteMany();
  console.log('Existing data cleared');
};

// Create sample products
const createProducts = async () => {
  const products = [
    {
      order: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'High-quality wireless headphones with noise cancellation',
      category: 'Electronics',
      stock: 50
    },
    {
        order: 2,
      name: 'Smart Watch',
      price: 199.99,
      description: 'Latest model smart watch with health tracking',
      category: 'Electronics',
      stock: 30
    },
    {
        order: 3,
      name: 'Running Shoes',
      price: 79.99,
      description: 'Comfortable running shoes for all terrains',
      category: 'Sports',
      stock: 100
    },
    {
        order: 4,
      name: 'Coffee Maker',
      price: 49.99,
      description: 'Automatic coffee maker with timer',
      category: 'Home',
      stock: 25
    },
    {
        order: 5,
      name: 'Backpack',
      price: 39.99,
      description: 'Durable backpack with laptop compartment',
      category: 'Accessories',
      stock: 75
    }
  ];

  const createdProducts = await Product.insertMany(products);
  console.log(`${createdProducts.length} products created`);
  return createdProducts;
};

// Create sample users
const createUsers = async (products) => {
  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      address: {
        street: '123 Admin St',
        city: 'Tech City',
        state: 'CA',
        country: 'USA',
        zipCode: '94016'
      },
      phone: '+14155552671'
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'test1234',
      address: {
        street: '456 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10001'
      },
      phone: '+12125551234',
      cart: {
        items: [
          { productId: products[0]._id, quantity: 2 },
          { productId: products[2]._id, quantity: 1 }
        ]
      },
      wishlist: [products[1]._id, products[3]._id]
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'test1234',
      address: {
        street: '789 Oak Ave',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        zipCode: '60601'
      },
      phone: '+13125559876',
      cart: {
        items: [
          { productId: products[1]._id, quantity: 1 },
          { productId: products[3]._id, quantity: 3 }
        ]
      }
    },
    {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      password: 'test1234',
      address: {
        street: '321 Pine Rd',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        zipCode: '73301'
      },
      phone: '+15125554433',
      wishlist: [products[0]._id, products[4]._id]
    }
  ];

  // Hash passwords before saving
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  const createdUsers = await User.insertMany(users);
  console.log(`${createdUsers.length} users created`);
  return createdUsers;
};

// Main seeding function
const seedDB = async () => {
  try {
    await cleanCollections();
    const products = await createProducts();
    await createUsers(products);
    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    process.exit();
  }
};

// Run the seeder
seedDB();