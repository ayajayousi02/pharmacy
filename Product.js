const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  sideEffects: {
    positive: {
      type: String,
      default: ""
    },
    negative: {
      type: String,
      default: ""
    }
  },
  images: {
    type: [String], // مصفوفة روابط/مسارات للصور
    default: []
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);

