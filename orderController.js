const Order = require("../models/Order");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");

// ✅ إنشاء أوردر
exports.createOrder = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products required" });
    }

    let totalPrice = 0;
    const productDetails = [];

    for (let item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const quantity = item.quantity || 1;

      totalPrice += product.price * quantity;

      productDetails.push({
        product: product._id,
        quantity
      });
    }

    let discount = 0;
    let couponId = null;

    // 🎯 استخدام الكوبون من الداتابيس
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon || !coupon.isActive) {
        return res.status(400).json({ message: "Invalid coupon" });
      }

      if (new Date() > coupon.expiresAt) {
        return res.status(400).json({ message: "Coupon expired" });
      }

      discount = (totalPrice * coupon.discount) / 100;
      couponId = coupon._id;
    }

    const finalPrice = totalPrice - discount;

    const order = await Order.create({
      user: req.user.id,
      products: productDetails,
      totalPrice,
      discount,
      finalPrice,
      coupon: couponId
    });

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ أوردرات اليوزر
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product")
      .populate("coupon");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ كل الأوردرات (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      .populate("coupon");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ تحديث الحالة
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Updated", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ حذف أوردر
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};