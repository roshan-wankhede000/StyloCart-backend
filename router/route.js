let express = require("express");
let router = express.Router();
const { registerUser, checkLogin, logOut } = require("../controller/registerController");
let { addproduct,getproduct } = require("../controller/productController");
let {addToCart, getCart,removeFromCart} = require("../controller/cartController")
const { placeOrder, getOrders } = require("../controller/orderController");
let {getAllOrders, deleteitems} = require("../controller/adminController")
const controller = require('../controller/orderController');
let multer = require("multer");

// Corrected 'storage' spelling
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // FIXED THIS LINE
  }
});

let upload = multer({ storage: storage });

router.post("/login", checkLogin);
router.get("/logout",logOut)
router.post("/addUser", registerUser);
// router.post("/addProduct",upload.single('image1'),addproduct);
router.post(
  "/addProduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addproduct
);
router.get("/getproduct",getproduct)
router.post("/addToCart/:id",addToCart)
router.get("/getCart",getCart)
router.delete("/removeFromCart/:id",removeFromCart)
router.post("/placeorder", placeOrder);
router.get("/getorders",getOrders)

// admin

router.get("/getAllOrders",getAllOrders)
// router.get("/deleteitems/:id", deleteitems)
router.delete('/deleteitems/:id', deleteitems); // from adminController, already destructured


module.exports = router;
