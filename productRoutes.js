const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");

// إعداد مكان تخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
// عرض المنتجات → أي يوزر يقدر يشوف
router.get("/", authMiddleware, productController.getProducts);

// إضافة منتج → أدمن فقط
router.post("/", authMiddleware, adminMiddleware, upload.array("images", 5), productController.createProduct);

// تعديل منتج → أدمن فقط
router.put("/:id", authMiddleware, adminMiddleware, upload.array("images", 5), productController.updateProduct);

// حذف منتج → أدمن فقط
router.delete("/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;

