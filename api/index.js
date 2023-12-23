const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://betulcagilkrdmn:R8yFK2dsuD5uBLXJ@cluster0.1w0njly.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ username, password });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.listen(4000);
//mongodb+srv://betulcagilkrdmn:R8yFK2dsuD5uBLXJ@cluster0.1w0njly.mongodb.net/?retryWrites=true&w=majority
//Password R8yFK2dsuD5uBLXJ
