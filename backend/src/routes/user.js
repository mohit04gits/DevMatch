const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../model/connectionRequest");
const { set } = require("mongoose");
const User = require("../model/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills about";

// Requests Received
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    res.json({ message: "Data fetch successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// CONNECTIONS
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequests
  .filter(row => row.fromUserId && row.toUserId) // <- filter out broken references
  .map((row) => {
    if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
      return row.toUserId;
    }
    return row.fromUserId;
  });


    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// FEED SECTION
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA);

    return res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user by ID
userRouter.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("firstName photoUrl");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;