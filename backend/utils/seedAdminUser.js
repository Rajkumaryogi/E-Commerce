// In /seeders/adminUserSeeder.js

const mongoose = require("mongoose");
const AdminUser = require("../models/AdminUser");
require("dotenv").config();
const connectDB = require("../config/database");

// Connect to MongoDB
connectDB();

const seedAdminUser = async () => {
    
      try {
        console.log("🌱 Seeding AdminUser Data...");
        const existing = await AdminUser.findOne({ email: 'rajyogi1811@gmail.com' });
    
        if (existing) {
          console.log('⚠️ Admin user already exists. Skipping seed.');
        } else {
          const admin = new AdminUser({
            name: 'Yogi',
            email: 'rajyogi1811@gmail.com',
            password: 'Pass1234',
            Admin: true,
          });
          
    
          await admin.save();
          console.log('✅ Admin user seeded successfully!');
        }
      } catch (err) {
        console.error('❌ Error seeding admin user:', err);
      } finally {
        mongoose.connection.close();
      }
    };

// Run the seed function
seedAdminUser();
