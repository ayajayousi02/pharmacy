const Coupon = require("../models/Coupon");

// إنشاء كوبون (Admin)
exports.createCoupon = async (req, res) => {
  try {
    const { code, discount, expiresAt } = req.body;

    if (!code || !discount || !expiresAt) {
      return res.status(400).json({ message: "All fields required" });
    }

    const coupon = await Coupon.create({ code, discount, expiresAt });

    res.status(201).json({
      message: "Coupon created successfully",
      coupon
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// عرض الكوبونات (Admin)
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف كوبون
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json({ message: "Coupon deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};