const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product'); // Adjust path if needed

const products = [
  {
    order: 1,
    name: "Classic White T-Shirt",
    visibility: true,
    description: "A comfortable and versatile white t-shirt made from organic cotton.",
    price: 499,
    category: "Men",
    stock: 50,
    imageUrl: "https://source.unsplash.com/300x400/?tshirt,white",
    seller: "Chlothzy",
    brand: "Chlothzy Basics"
  },
  {
    order: 2,
    name: "Blue Denim Jacket",
    visibility: true,
    description: "Stylish and durable denim jacket for everyday wear.",
    price: 1799,
    category: "Men",
    stock: 20,
    imageUrl: "https://source.unsplash.com/300x400/?denim,jacket",
    seller: "Chlothzy",
    brand: "UrbanWear"
  },
  {
    order: 3,
    name: "Floral Summer Dress",
    visibility: true,
    description: "Lightweight floral print dress, perfect for summer outings.",
    price: 1399,
    category: "Women",
    stock: 30,
    imageUrl: "https://source.unsplash.com/300x400/?summer,dress",
    seller: "Chlothzy",
    brand: "FemmeStyle"
  },
  {
    order: 4,
    name: "Kids Cartoon T-Shirt",
    visibility: true,
    description: "Colorful t-shirt with fun cartoon prints for kids.",
    price: 399,
    category: "Kids",
    stock: 40,
    imageUrl: "https://source.unsplash.com/300x400/?kids,tshirt",
    seller: "Chlothzy",
    brand: "Kiddo"
  },
  {
    order: 5,
    name: "Women’s Leather Handbag",
    visibility: true,
    description: "Elegant leather handbag with adjustable strap and gold accents.",
    price: 1999,
    category: "Accessories",
    stock: 15,
    imageUrl: "https://source.unsplash.com/300x400/?leather,handbag",
    seller: "Chlothzy",
    brand: "LuxuryLine"
  },
  {
    order: 6,
    name: "Men’s Running Shoes",
    visibility: true,
    description: "Comfortable and lightweight running shoes with cushioned soles.",
    price: 2499,
    category: "Footwear",
    stock: 25,
    imageUrl: "https://source.unsplash.com/300x400/?running,shoes",
    seller: "Chlothzy",
    brand: "SpeedX"
  },
  {
    order: 7,
    name: "Gold-Plated Bracelet",
    visibility: true,
    description: "Elegant bracelet for special occasions.",
    price: 999,
    category: "Accessories",
    stock: 10,
    imageUrl: "https://source.unsplash.com/300x400/?bracelet,jewelry",
    seller: "Chlothzy",
    brand: "ShineCo"
  },
  {
    order: 8,
    name: "Girls Pink Hoodie",
    visibility: true,
    description: "Soft and warm hoodie for girls aged 5-10.",
    price: 799,
    category: "Kids",
    stock: 22,
    imageUrl: "https://source.unsplash.com/300x400/?hoodie,girl",
    seller: "Chlothzy",
    brand: "CozyKids"
  },
  {
    order: 9,
    name: "Women’s Ethnic Kurti",
    visibility: true,
    description: "Stylish ethnic wear made with breathable fabric.",
    price: 1099,
    category: "Women",
    stock: 18,
    imageUrl: "https://source.unsplash.com/300x400/?kurti,women",
    seller: "Chlothzy",
    brand: "IndiChic"
  },
  {
    order: 10,
    name: "Men’s Formal Pants",
    visibility: true,
    description: "Slim-fit formal trousers for office and events.",
    price: 1299,
    category: "Men",
    stock: 35,
    imageUrl: "https://source.unsplash.com/300x400/?formal,pants,men",
    seller: "Chlothzy",
    brand: "ExecutiveLine"
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany();
    console.log('🗑 Existing products cleared');

    await Product.insertMany(products);
    console.log('🌱 10 Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
