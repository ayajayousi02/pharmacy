const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const multer = require('multer');

const router = express.Router();

// إعداد رفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// عرض كل الكاتيجوريز → أي يوزر يقدر يشوف
router.get('/', authMiddleware, getCategories);

// عرض كاتيجوري محدد بالـ ID → أي يوزر يقدر يشوف
router.get('/:id', authMiddleware, getCategoryById);

// إضافة كاتيجوري → أدمن فقط (مع صورة)
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createCategory);

// تعديل كاتيجوري → أدمن فقط (مع صورة جديدة إذا بدك)
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateCategory);

// حذف كاتيجوري → أدمن فقط
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;
