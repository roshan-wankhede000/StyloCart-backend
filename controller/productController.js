let product = require("../model/productModel")

let addproduct = async (req, res) => {
  try {
    let { name, description, category, subCategory, price, sizes, bestseller } = req.body;

    // Safely access uploaded image filenames
    let image1 = req.files?.image1?.[0]?.filename || "";
    let image2 = req.files?.image2?.[0]?.filename || "";
    let image3 = req.files?.image3?.[0]?.filename || "";
    let image4 = req.files?.image4?.[0]?.filename || "";

    // Handle checkbox values properly
    // If sizes are checkboxes, multiple values might be submitted
    if (Array.isArray(sizes)) {
      sizes = sizes.join(","); // Convert to string (comma-separated)
    }

    if (bestseller === "on") {
      bestseller = "yes";
    }

    await product.create({
      image1,
      image2,
      image3,
      image4,
      name,
      description,
      category,
      subCategory,
      price,
      sizes,
      bestseller,
    });

    return res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};


let getproduct = async(req,res)=>{
    let p = await product.find();

    return res.status(201).json(p)
}

module.exports = {addproduct,getproduct}