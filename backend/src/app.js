const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const app = express();
const http = require("http");

const User = require("./model/user");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const paymentRouter = require("./routes/payment");
const chatRouter = require("./routes/chat"); // ✅ no destructuring

require("dotenv").config();

const server = http.createServer(app);
initializeSocket(server); //calling with server

// Middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",                        // local frontend
  "https://dev-match-ynxo.vercel.app/",     // deployed Vercel URL (replace this)
];

//hi


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // ✅ Add PATCH here
  })
);
;

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);
app.use("/",userRouter)


app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const Allowed_Updates = ["skills", "about", "age", "gender"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      Allowed_Updates.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed for one or more fields");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send(user);
  } catch (err) {
    res.status(400).send("Update failed: " + err.message);
  }
});

// Connect to Database and Start Server
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(process.env.PORT || 3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database not connected", err);
  });
