const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const connectDB = require("./DBconnect");
const User = require("./userSchema");
const bcrypt = require("bcrypt");
const cp = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./userAuth");
app.use(cp());
app.use(cors({credentials:true, origin:"http://localhost:5173"}));
app.use(express.json());

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.post("/signup", async (req, res) => {
  // Signup logic will go here
  try {
    const { fname, lname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    } else {
      const token = await user.getJWT();
      res.cookie("loginToken",token,{expires:new Date(Date.now()+24*60*60*1000)});
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Error logging in user");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/getProfile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Error retrieving profile");
  }
});
