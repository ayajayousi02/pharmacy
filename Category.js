const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String } // نخزن مسار الصورة (path من multer)
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
