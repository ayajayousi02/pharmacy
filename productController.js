const Product = require("../models/Product");

// إضافة منتج جديد (أدمن فقط)
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      images: req.files ? req.files.map(file => file.path) : []
    };
    const product = new Product(productData);
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// تحديث منتج (أدمن فقط)
exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      images: req.files ? req.files.map(file => file.path) : undefined
    };
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// جلب كل المنتجات (يوزر وأدمن)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف منتج (أدمن فقط)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
