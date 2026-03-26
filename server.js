const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require("./routes/productRoutes");
const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Routes
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use("/api/products", productRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.error("❌ DB connection error:", err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
