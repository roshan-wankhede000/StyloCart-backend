const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image1: {
    type: String
  },
   image2: {
    type: String
  },
   image3: {
    type: String
  },
   image4: {
    type: String
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  price: {
    type: Number,
  },
  sizes: {
    type: String,
  },
  bestseller: {
    type: String,
  },
  
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
