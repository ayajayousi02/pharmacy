const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    genericName: {
      type: String,
      required:true

    },

    brandExamples: {
      type: String,
      default: ""
    },

    price: {
     type: Number,
      
     required:true

    },

    drugClass: {
      type: String,
      default: ""
    },

    rxStatus: {
      type: String,
      default: ""
    },

    commonUses: {
      type: String,
      default: ""
    },

    dosageForms: {
      type: String,
      default: ""
    },

    countInStock: {
      type: Number,
      default: 0
    },

    image: {
      type: String,
      default: ""
    },

    category: {
  type: String,
  required:true
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
