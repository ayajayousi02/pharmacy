const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// عرض كل المنتجات
router.get("/", authMiddleware, productController.getProducts);


// إضافة منتج واحد
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);


// إدخال كل المنتجات من JSON
router.post(
  "/bulk",
  authMiddleware,
  adminMiddleware,
  productController.bulkInsertProducts
);


// تعديل منتج
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);


// حذف منتج
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

module.exports = router;
