const Product = require("../models/Product");

// إضافة منتج جديد
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      images: req.files ? req.files.map(file => file.path) : []
    };
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// تحديث منتج
exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      images: req.files ? req.files.map(file => file.path) : undefined
    };
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// جلب كل المنتجات
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف منتج
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

