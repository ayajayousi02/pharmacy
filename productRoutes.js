const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
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

// إضافة منتج مع عدة صور
router.post("/", upload.array("images", 5), productController.createProduct); 
// ممكن تحددي عدد الصور (مثلاً 5)

// باقي الـ CRUD
router.get("/", productController.getProducts);
router.put("/:id", upload.array("images", 5), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

