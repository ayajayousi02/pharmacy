const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
// Middleware
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');

const app = express();

// Middleware عام
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Auth Routes
app.use('/auth', authRoutes);

// Category Routes
app.use('/categories', categoryRoutes);

// Product Routes
app.use("/api/products", productRoutes);
app.use("/users", userRoutes);
// Admin Dashboard Route
app.get('/admin/dashboard', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Welcome Admin!', user: req.user });
});

// Redirect Route (يوجه حسب الرول)
app.get('/redirect', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') {
    return res.json({ redirect: '/admin/dashboard' });
  } else {
    return res.json({ redirect: '/home' });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.error("❌ DB connection error:", err));
