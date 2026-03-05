let Order = require("../model/ordersModel")
const Cart = require("../model/cartModel"); // Adjust the path as needed

const placeOrder = async (req, res) => {
  try {
    const emailFromCookie = req.cookies.email;
    const {
      firstName, lastName, email, address, city,
      state, zip, country, phone, paymentMethod
    } = req.body;

    if (!emailFromCookie || emailFromCookie !== email) {
      return res.status(400).json({ error: "Email mismatch or missing" });
    }

    const cartItems = await Cart.find({ email: emailFromCookie });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const products = cartItems.map(item => ({
      name: item.name,
      price: item.unitPrice,
      quantity: item.quantity,
      size: item.size,
      image: item.image  // ✅ Correct image field
    }));

    const newOrder = new Order({
      firstName, lastName, email, address, city,
      state, zip, country, phone, paymentMethod,
      products
    });

    await newOrder.save();
    await Cart.deleteMany({ email: emailFromCookie });

    res.json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const getOrders = async (req, res) => {
  try {
    const email = req.cookies.email;

    if (!email) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    console.error("Get Orders Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { placeOrder, getOrders };
