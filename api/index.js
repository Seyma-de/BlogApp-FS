const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
var bcrypt = require("bcryptjs");

const app = express();

const salt = bcrypt.genSaltSync(10);
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://betulcagilkrdmn:R8yFK2dsuD5uBLXJ@cluster0.1w0njly.mongodb.net/?retryWrites=true&w=majority"
);

// Listen for the error event
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

// Listen for the disconnection event
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Gracefully close the connection on application termination
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.listen(4000);
//mongodb+srv://betulcagilkrdmn:R8yFK2dsuD5uBLXJ@cluster0.1w0njly.mongodb.net/?retryWrites=true&w=majority
//Password R8yFK2dsuD5uBLXJ
