const dotenv = require("dotenv")
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const route = require("./router/route");
const session = require('express-session');
const passport = require("passport")
const cron = require("node-cron");
const axios = require("axios");

dotenv.config()

const port = process.env.PORT || 8000

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection failed", err));

  app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./router/auth'); 
app.use('/', authRoutes); 

app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.username = req.cookies.username || null;
  res.locals.msg = req.cookies.msg || null;
  next();
});

app.use(cors({
  origin: "https://stylocart.netlify.app",
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/", route);


// Schedule: every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  try {
    console.log("⏰ Cron job running: calling project URL");
    await axios.get(process.env.APP_URL); 
  } catch (err) {
    console.error("Cron job failed:", err.message, err.response?.status || "");
  }
});

app.listen(port, () => console.log(`✅ Server started on http://localhost:${port}`));

