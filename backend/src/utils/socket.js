const socket = require("socket.io");
const { Chat } = require("../model/chat");
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
    origin: [
      "http://localhost:5173",
      "https://dev-tinder-fuzq.vercel.app",  // <— allow your Vercel URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  });
  io.on("connection", (socket) => {
    //handle events

    socket.on("joinChat", async ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");

      console.log(firstName + "joining room : " + roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        const roomId = [userId, targetUserId].sort().join("_");
        console.log(firstName + " " + text);

        //SAVE MESSAGE TO THE DATABASE HERE
        try {
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          //if chat is not present
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();
        } catch (err) {
          console.log(err);
        }
        io.to(roomId).emit("receiveMessage", {
          firstName,
          text,
          timestamps: new Date(),
        });
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
