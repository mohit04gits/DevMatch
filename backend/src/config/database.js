const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
// not the good way of connecting to the database
//-----------------------------------------------------------------
// mongoose.connect(
//     "mongodb+srv://smite1834:T3xn0kU3SamSJBvD@namastenodejs.fdygw.mongodb.net/"
// );

const connectDB = async () => {
  await mongoose.connect(
    process.env.DB_CONNECTION_SECRET,
  );
};

module.exports = connectDB;
