const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      //lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum:{ values: ["male","female","others"], message:`{VALUE} invalid value`}
    },
    skills: {
      type: [String],
      validate: {
        validator: function (skills) {
          return skills.length <= 10; // Restrict length to 10
        },
        message: "Skills cannot exceed 10 entries",
      },
    },
    photoUrl:{
      type:String,
      default: "https://static.vecteezy.com/system/resources/previews/049/670/895/non_2x/a-person-s-profile-icon-in-a-circle-free-png.png"
    },
    about:{
      type:String,
      default:"Hii hello"
    },
  },
  {
    timestamps: true,
  }
);
//USER SCHEMA METHODS 
userSchema.methods.getJWT = async function () {
  const user = this;
  //getting
  const token = await jwt.sign({ _id: user._id }, "BikiKumar", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  console.log("password: "+user.password)
  const isPasswordvalid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  console.log(passwordInputByUser);
  
  return isPasswordvalid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
