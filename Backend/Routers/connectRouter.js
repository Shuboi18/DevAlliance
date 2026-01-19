const express = require("express");
const connectRouter = express.Router();
const ConnectRequest = require("../Models/connectReqSchema");
const { userAuth } = require("../userAuth");
const User = require("../Models/userSchema");
const requestedFields = ["fname", "lname", "age", "gender", "bio", "skills", "photoURL"];

connectRouter.post(
  "/connect/request/:status/:toUserID",
  userAuth,
  async (req, res) => {
    try {
      const fromUserID = req.user._id;
      const toUserID = req.params.toUserID;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];

      if (fromUserID.toString() === toUserID.toString()) {
        return res.status(400).send("Cannot send a request to yourself");
      }
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Bad Request");
      }
      const checkValidConnection = await User.findById(toUserID);
      if (!checkValidConnection) {
        return res.status(400).send("User does not exist please check again");
      }
      const existingConnection = await ConnectRequest.findOne({
        $or: [
          { fromUserID, toUserID },
          { fromUserID: toUserID, toUserID: fromUserID },
        ],
      });
      if (existingConnection) {
        return res.status(400).send("Connect Request already exists");
      }

      const connectReq = new ConnectRequest({
        fromUserID,
        toUserID,
        status,
      });
      await connectReq.save();
      res.send("Connection Request Sent Succesfully");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }
);

//doubt
connectRouter.patch(
  "/connect/response/:status/:_id",
  userAuth,
  async (req, res) => {
    try {
      
      const allowedStatus = ["accepted", "rejected"];
      const status = req.params.status;
      const connectID = req.params._id;
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Bad Request");
      }
      const connectRes = await ConnectRequest.findByIdAndUpdate(connectID, {
        status,
      });
      res.json({
        message: "Connection Request Accepted Succesfully",
        data: connectRes,
      });
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }
);

connectRouter.get("/connect/pendingConnections", userAuth, async (req, res) => {
  try {
    const user = req.user._id;
    const pendingConnections = await ConnectRequest.find({
      toUserID: user,
      status: "interested",
    }).select("_id fromUserID").populate("fromUserID", requestedFields);
    if (!pendingConnections) {
      return res.send("No requests to show");
    }
    res.send(pendingConnections);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectRouter.get("/connect/myConnections", userAuth, async (req, res) => {
  try {
    const user = req.user._id;
    const myConnections = await ConnectRequest.find({
      $or: [
        { toUserID: user, status: "accepted" },
        { fromUserID: user, status: "accepted" },
      ],
    })
      .populate("fromUserID", requestedFields)
      .populate("toUserID", requestedFields);

    res.send(myConnections);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = connectRouter;
