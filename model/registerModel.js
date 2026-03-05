const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

module.exports = mongoose.model("register", registerSchema);
