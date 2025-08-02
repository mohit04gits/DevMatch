const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
}); 

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;
    const allowedFields = ["firstName", "lastName", "age", "gender", "about", "photoUrl"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        loggedInUser[field] = req.body[field];
      }
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    console.error("Edit Profile Error:", err);
    res.status(400).json({ message: err.message });
  }
});


module.exports = profileRouter;

