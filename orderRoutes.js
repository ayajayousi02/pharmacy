const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// User
router.post("/", authMiddleware, orderController.createOrder);
router.get("/my-orders", authMiddleware, orderController.getMyOrders);

// Admin
router.get("/", authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put("/:id", authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.delete("/:id", authMiddleware, adminMiddleware, orderController.deleteOrder);

module.exports = router;