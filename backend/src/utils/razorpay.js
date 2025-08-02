// require("dotenv").config();  // Load environment variables first

//  // Then import Razorpay

// const Razorpay = require("razorpay");

// const razorpayInstance = new Razorpay({
//     // key_id:"rzp_test_Fd1yw6bJTtEnJl",
//     // key_secret:"ckbVcXYFpNB88n0D015CDOg4"
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
//  //oauthToken: process.env.RAZORPAY_OAUTH_TOKEN,
// });

// module.exports = razorpayInstance;


require("dotenv").config();
const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpayInstance;
