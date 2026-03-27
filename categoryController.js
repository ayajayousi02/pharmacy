const Category = require('../models/Category');

// إضافة كاتيجوري جديد (للأدمن فقط)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.path : null; // إذا رفع صورة

    if (!name) return res.status(400).json({ message: "Name is required" });

    const category = await Category.create({ name, image });
    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// عرض كل الكاتيجوريز (مسموح للجميع)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// عرض كاتيجوري محدد بالـ ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// تعديل كاتيجوري (للأدمن فقط)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updateData = {};
    if (name) updateData.name = name;
    if (image) updateData.image = image;

    const category = await Category.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف كاتيجوري (للأدمن فقط)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
