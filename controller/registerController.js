const bcrypt = require("bcrypt");
const register = require("../model/registerModel");

const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

let registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    await register.create({ username, email, password: hashedPassword });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

let checkLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await register.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Username Or Password Not Correct" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Username Or Password Not Correct" });
    }

    res.cookie("email", user.email, {
      httpOnly: false,
      sameSite: 'lax',
      secure: false
    });

    return res.status(200).json({ message: "Login Successfully!!" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

let logOut = async (req, res) => {
  try {
    res.clearCookie('email', {
      path: '/',
      sameSite: 'Strict',
      secure: false
    });

    return res.status(200).json({ message: "User Logout successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, checkLogin, logOut };
