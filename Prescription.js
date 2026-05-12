const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  prescriptionId: { type: String, unique: true },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  patientName: {
    type: String,
    required: true
  },

  medicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],

  image: {
    type: String
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);