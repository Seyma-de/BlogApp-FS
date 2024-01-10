const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
var bcrypt = require("bcryptjs");

const app = express();

const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45ew45w345wegwuwirez9387429329z749238z4";
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
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
//register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (!userDoc) {
    // Kullanıcı bulunamadı
    return res.status(400).json("Kullanıcı bulunamadı");
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    // Giriş yapıldı
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    // Şifre yanlış
    res.status(400).json("Yanlış kimlik bilgileri");
  }
});

app.listen(4000);
//mongodb+srv://betulcagilkrdmn:R8yFK2dsuD5uBLXJ@cluster0.1w0njly.mongodb.net/?retryWrites=true&w=majority
//Password R8yFK2dsuD5uBLXJ
