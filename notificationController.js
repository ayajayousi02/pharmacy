const Notification = require("../models/Notification");

// 🔥 تستخدم داخلياً (مهم)
exports.createNotification = async (userId, title, message) => {
  await Notification.create({
    user: userId,
    title,
    message
  });
};

// عرض إشعاراتي
exports.getMyNotifications = async (req, res) => {
  try {
    const data = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تعليم كمقروء
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};