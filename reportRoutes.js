const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Prescription = require("../models/Prescription");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMedicines = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalPrescriptions = await Prescription.countDocuments();

    res.json({ totalUsers, totalMedicines, totalOrders, totalPrescriptions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
