const Prescription = require("../models/Prescription");
const Order = require("../models/Order");
const { createNotification } = require("./notificationController");

// ✅ إنشاء روشيتة
exports.createPrescription = async (req, res) => {
  try {
    const { patientName, medicines } = req.body;

    const image = req.file ? req.file.path : null;

    const count = await Prescription.countDocuments();
    const prescriptionId = `PR-${count + 1}`;

    const prescription = await Prescription.create({
      prescriptionId,
      user: req.user.id,
      patientName,
      medicines,
      image
    });

    res.status(201).json({
      message: "Prescription created successfully",
      prescription
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// عرض الكل (Admin)
exports.getPrescriptions = async (req, res) => {
  try {
    const data = await Prescription.find()
      .populate("user")
      .populate("medicines");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// عرض الخاص فيني
exports.getMyPrescriptions = async (req, res) => {
  try {
    const data = await Prescription.find({ user: req.user.id })
      .populate("medicines");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 تحديث الحالة + Order + Notification
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const prescription = await Prescription.findById(req.params.id)
      .populate("medicines");

    if (!prescription) {
      return res.status(404).json({ message: "Not found" });
    }

    prescription.status = status;
    await prescription.save();

    // ✅ Approved
    if (status === "approved") {

      let totalPrice = 0;

      const products = prescription.medicines.map(med => {
        totalPrice += med.price;
        return { product: med._id, quantity: 1 };
      });

      const order = await Order.create({
        user: prescription.user,
        products,
        totalPrice,
        finalPrice: totalPrice
      });

      await createNotification(
        prescription.user,
        "Prescription Approved ✅",
        "Your prescription has been approved and converted to an order"
      );

      return res.json({
        message: "Approved & Order created",
        prescription,
        order
      });
    }

    // ❌ Rejected
    if (status === "rejected") {
      await createNotification(
        prescription.user,
        "Prescription Rejected ❌",
        "Your prescription has been rejected"
      );
    }

    res.json({
      message: "Status updated",
      prescription
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};