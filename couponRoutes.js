const express = require("express");
const router = express.Router();

const couponController = require("../controllers/couponController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin only
router.post("/", authMiddleware, adminMiddleware, couponController.createCoupon);
router.get("/", authMiddleware, adminMiddleware, couponController.getCoupons);
router.delete("/:id", authMiddleware, adminMiddleware, couponController.deleteCoupon);

module.exports = router;