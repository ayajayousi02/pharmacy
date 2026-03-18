const express = require('express');
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createCategory);
router.get('/', authMiddleware, getCategories);
router.put('/:id', authMiddleware, updateCategory);   // تعديل
router.delete('/:id', authMiddleware, deleteCategory); // حذف

module.exports = router;
