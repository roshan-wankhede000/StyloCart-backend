let order = require("../model/ordersModel");
let products = require("../model/productModel");

let getAllOrders = async (req, res) => {
  let data = await order.find();
  return res.status(200).json(data);
};

let deleteitems = async (req, res) => {
  try {
    let { id } = req.params;
    await products.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed", details: err.message });
  }
};

module.exports = { getAllOrders, deleteitems };
