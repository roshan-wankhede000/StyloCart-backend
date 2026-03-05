const Cart = require('../model/cartModel');
const Product = require('../model/productModel');
const cookie =  require("cookie-parser")

const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, quantity } = req.body;
    const email = req.cookies.email;

    if (!email || !size) {
      return res.status(400).json({ error: 'Email and size are required' });
    }

    const product = await Product.findById(id);
    if (!product) {
 
      return res.status(404).json({ error: 'Product not found' });
    }


    const qtyToAdd = quantity ? parseInt(quantity) : 1;

    const existingItem = await Cart.findOne({
      productId: product._id,
      size,
      email
    });

    if (existingItem) {
      existingItem.quantity += qtyToAdd;
      existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity;
      await existingItem.save();
      return res.json({ message: 'Quantity updated', cartItem: existingItem });
    }

    const newCart = new Cart({
      productId: product._id,
      name: product.name,
      unitPrice: product.price,
      totalPrice: product.price * qtyToAdd,
      image: product.image1,
      size,
      quantity: qtyToAdd,
      email:email
    });

    await newCart.save();
    res.json({ message: 'Product added to cart', cartItem: newCart });

  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getCart = async (req, res) => {
  try {
    const email = req.cookies.email;
    if (!email) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const cartItems = await Cart.find({ email });
    res.json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const email = req.cookies.email;
    const { id } = req.params; // cart item id (_id in Cart collection)

    if (!email) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const deletedItem = await Cart.findOneAndDelete({ _id: id, email });

    if (!deletedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // return updated cart also
    const cartItems = await Cart.find({ email });

    res.json({
      message: "Item removed successfully",
      cartItems
    });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { addToCart, getCart, removeFromCart };
