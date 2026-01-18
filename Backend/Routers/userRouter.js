const express = require("express");
const userRouter = express.Router();
const User = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const { userAuth } = require("../userAuth");
const ConnectRequest = require("../Models/connectReqSchema");
const requestedFields = "fname lname age gender bio skills photoURL";
userRouter.post("/user/signup", async (req, res) => {
  // Signup logic will go here
  try {
    const { fname, lname, email, age, gender, bio, skills, photoURL, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fname,
      lname,
      email,
      age,
      gender,
      bio,
      skills,
      photoURL,
      password: hashedPassword,
    });
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user");
  }
});

userRouter.post("/user/login", async (req, res) => {
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
      res.cookie("loginToken", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Error logging in user");
  }
});

userRouter.post("/user/logout", async (req, res) => {
  try {
    res.cookie("loginToken", "", { expires: new Date(Date.now()) });
    res.send("User logged out successfully");
  } catch (err) {
    res.status(500).send("Error logging out user");
  }
});

userRouter.get("/user/getUserFeed", userAuth, async (req, res) => {
  try {
    const user = req.user._id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    limit = limit > 50 ? 50 : limit;

    const allConnections = await ConnectRequest.find({
      $or: [{ fromUserID: user }, { toUserID: user }],
    }).select("fromUserID toUserID");
    const hiddenUsersSet = new Set();

    hiddenUsersSet.add(user.toString());

    allConnections.forEach((req) => {
      hiddenUsersSet.add(req.fromUserID.toString());
      hiddenUsersSet.add(req.toUserID.toString());
    });

    const userFeed = await User.find({
      _id: { $nin: Array.from(hiddenUsersSet) },
    })
      .select(requestedFields)
      .skip(skip)
      .limit(limit);
    res.send(userFeed);
  } catch (err) {
    res.status(500).send("Error retrieving user feed");
  }
});

module.exports = userRouter;
