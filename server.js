const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const couponRoutes = require("./routes/couponRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const reportRoutes = require("./routes/reportRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
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
app.use("/orders", orderRoutes);
app.use("/coupons", couponRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/notifications", notificationRoutes);
app.use("/reports", reportRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);

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
app.get('/', (req, res) => {
    console.log("Root route hit!");
  res.send('Welcome to Pharmacy API 🚀');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.error("❌ DB connection error:", err));
