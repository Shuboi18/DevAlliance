const express = require('express');
const profileRouter = express.Router();
const User = require("../Models/userSchema");
const { userAuth } = require("../userAuth");

profileRouter.get("/profile/getProfile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    
    res.send(user);
  } catch (err) {
    res.status(500).send("Error retrieving profile");
  }
});

profileRouter.patch("/profile/editProfile", userAuth, async (req, res) => {
  const user = req.user;
  const { fname, lname, gender, bio, skills, photoURL } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      fname,
      lname,
      gender,
      bio,
      skills,
      photoURL,
    });
    res.send("user profile updated successfully");
  } catch (err) {
    res.status(500).send("Error updating profile");
  }
});

profileRouter.delete("/profile/deleteProfile", userAuth, async (req, res) => {
  const user = req.user;
  try {
    const deleteUser = await User.findByIdAndDelete(user._id);
    res.send("user profile deleted successfully");
  } catch (err) {
    res.status(500).send("Error updating profile");
  }
});

module.exports = profileRouter;