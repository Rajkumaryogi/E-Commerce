import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import connectDB from "./config/connectDB.js";
// Import routes
// import productRoutes from "./routes/productRoutes.js";
// import newsletterRoutes from "./routes/newsletterRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;
// Enhanced CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-theta-coral-19.vercel.app",
  "https://rajchlothzy.vercel.app",
];
app.use(
  cors({
    origin: process.env.CLIENT_URL || allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Middleware
app.set("trust proxy", 1);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(compression());
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Database connection
connectDB();
// Basic health check route
app.get("/", (req, res) => {
  res.send("Server is running");
});
// Mount routes with proper paths
// app.use("/api/products", productRoutes);
// app.use("/api/newsletter", newsletterRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/admin", adminRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server in all environments
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
// Export for Vercel serverless function
export default app;