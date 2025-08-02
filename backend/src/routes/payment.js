const express = require("express");
const razorpayInstance = require("../utils/razorpay");
const paymentRouter = express.Router();
const Payment = require("../model/payment");
const { userAuth } = require("../middlewares/auth");
const membershipAmount = require("../utils/constants");
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#" + new Date().getTime(), // unique receipt
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });
    console.log(membershipType);
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Razorpay Order Creation Error:", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

//payment verification
paymentRouter.post("/payment/webhook", async (req,res) => {
  try{
    const webhookSignature = req.get["X-Razorpay-Signature"];
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process,env.RAZORPAY_WEBHOOK_SECRET
    );

    if(!isWebhookValid){
      return res.status(500).json({msg: "webhook is invalid"});
    }
    //update payment status in db
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({orderId: paymentDetails.order_id})
    payment.status = paymentDetails.payment.status;
    await payment.save();

    //update user as premium
    
    
  }catch(err) {
    return res.status(500).json({msg: errr.message});
  }
})



module.exports = paymentRouter;
