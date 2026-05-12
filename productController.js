const Product = require("../models/Product");


// إضافة منتج واحد
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};


// إدخال مجموعة منتجات
exports.bulkInsertProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);

    res.status(201).json({
      message: "Products inserted successfully",
      products
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};


// جلب كل المنتجات
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.json(products);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


// تحديث منتج
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated successfully",
      product
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};


// حذف منتج
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
