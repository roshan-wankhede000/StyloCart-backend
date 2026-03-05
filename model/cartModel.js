const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  unitPrice: Number,  // 🔁 fixed price per item
  totalPrice: Number, // 🔁 unitPrice * quantity
  image: String,
  size: String,
  quantity: Number,
  email:String,
},{timestamps: true});

module.exports = mongoose.model('cart', cartSchema);
