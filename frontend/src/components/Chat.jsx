// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import moment from "moment";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { FaPaperPlane } from "react-icons/fa"; // Ensure you have react-icons installed

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [targetUser, setTargetUser] = useState(null);

//   const user = useSelector((store) => store.user);
//   const chatUserList = useSelector((store) => store.connections) || [];
//   const userId = user?._id;

//   const timestamp = new Date().toISOString();      //IMPORTANT 

//   useEffect(() => {
//     const fetchTargetUser = async () => {
//       if (chatUserList.length === 0) {
//         try {
//           const res = await axios.get(`${BASE_URL}/user/${targetUserId}`, {
//             withCredentials: true,
//           });
//           setTargetUser(res.data);
//         } catch (err) {
//           console.error("Failed to fetch target user:", err.message);
//         }
//       } else {
//         const foundUser = chatUserList.find((u) => u._id === targetUserId);
//         setTargetUser(foundUser);
//       }
//     };
//     fetchTargetUser();
//   }, [chatUserList, targetUserId]);

//   const fetchChatMessages = async () => {
//     try {
//       const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
//         withCredentials: true,
//       });
//       const chatMessages = chat?.data?.messages.map((msg) => {
//         const { senderId, text } = msg;
//         return {
//           firstName: senderId?.firstName,
//           text: text,
//           timestamp: msg?.createdAt || timestamp,
//         };
//       });
//       setMessages(chatMessages);
//     } catch (err) {
//       console.error("Failed to fetch chat messages:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) return;
//     const socket = createSocketConnection();

//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//       timestamp,
//     });

//     socket.on("receiveMessage", ({ firstName, text }) => {
//       setMessages((messages) => [...messages, { firstName, text, timestamp }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-10/12 my-20 md:w-6/12 mx-auto flex flex-col h-[75vh] border bg-gray-900 rounded-lg shadow-lg">
//       {/* Chat Header */}
//       <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-t-lg flex items-center gap-3 shadow-lg">
//         <img
//           src={targetUser?.photoUrl}
//           alt="User"
//           className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
//           onClick={() => setShowModal(true)}
//         />
//         <h1 className="text-xl font-semibold text-white">
//           {targetUser?.firstName || "Unknown"}
//         </h1>
//       </div>

//       {/* Messages */}
//       <div className="relative flex-1 overflow-y-auto p-4 bg-gray-800 rounded-b-lg">
//         {messages.length === 0 && (
//           <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-xl font-semibold">
//             Chat with {targetUser?.firstName || "Unknown"}
//           </p>
//         )}
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex mb-3 ${
//               msg.firstName === user.firstName ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`p-3 rounded-lg shadow-md max-w-[75%] text-white ${
//                 msg.firstName === user.firstName
//                   ? "bg-blue-500 self-end"
//                   : "bg-gray-700"
//               }`}
//             >
//               <p className="text-sm font-semibold">{msg.firstName || "User"}</p>
//               <p className="text-md">{msg.text}</p>
//               <p className="text-xs text-gray-300 mt-1">
//                 {moment(msg.timestamp).format("hh:mm A")}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Message Input */}
//       <div className="w-full p-3 flex items-center gap-2 bg-gray-900 border-t border-gray-700">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           type="text"
//           className="flex-grow p-3 border-none bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
//         >
//           <FaPaperPlane size={18} />
//         </button>
//       </div>

//       {/* Modal for Photo Preview */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
//           onClick={() => setShowModal(false)}
//         >
//           <div className="relative p-4">
//             <img
//               src={targetUser?.photoUrl}
//               alt="User Full Size"
//               className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             />
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;



import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [targetUser, setTargetUser] = useState(null);

  const user = useSelector((store) => store.user);
  const chatUserList = useSelector((store) => store.connections) || [];
  const userId = user?._id;

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchTargetUser = async () => {
      if (chatUserList.length === 0) {
        try {
          const res = await axios.get(`${BASE_URL}/user/${targetUserId}`, {
            withCredentials: true,
          });
          setTargetUser(res.data);
        } catch (err) {
          console.error("Failed to fetch target user:", err.message);
        }
      } else {
        const foundUser = chatUserList.find((u) => u._id === targetUserId);
        setTargetUser(foundUser);
      }
    };
    fetchTargetUser();
  }, [chatUserList, targetUserId]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });
        const chatMessages = chat?.data?.messages.map((msg) => ({
          firstName: msg.senderId?.firstName || "User",
          text: msg.text,
          timestamp: msg.createdAt || new Date().toISOString(),
        }));
        setMessages(chatMessages);
      } catch (err) {
        console.error("Failed to fetch chat messages:", err.message);
      }
    };
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
      timestamp: new Date().toISOString(),
    });

    socketRef.current.on("receiveMessage", ({ firstName, text, timestamp }) => {
      setMessages((prev) => [...prev, { firstName, text, timestamp }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId, user.firstName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-base-100 mt-18 min-h-screen p-6 sm:p-10 flex flex-col max-w-4xl mx-auto rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={targetUser?.photoUrl}
          alt={targetUser?.firstName || "User"}
          className="w-16 h-16 rounded-full border-4 border-base-200 shadow-md cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <h2 className="text-2xl font-bold text-base-content">
          {targetUser?.firstName || "Unknown"}
        </h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-base-200 rounded-xl shadow-inner">
        {messages.length === 0 && (
          <p className="text-center text-base-content/60 italic">
            No messages yet. Say hello!
          </p>
        )}
        {messages.map((msg, index) => {
          const isOwn = msg.firstName === user.firstName;
          return (
            <div
              key={index}
              className={`flex mb-4 ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-4 rounded-xl shadow-md max-w-[70%] ${
                  isOwn ? "bg-primary text-primary-content" : "bg-base-300 text-base-content"
                }`}
              >
                <p className="font-semibold mb-1">{msg.firstName || "User"}</p>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p className="text-xs mt-2 text-base-content/50 text-right">
                  {moment(msg.timestamp).format("hh:mm A")}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="mt-6 items-center flex gap-3">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={2}
          className="flex-grow p-5 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="btn btn-primary px-6 flex items-center justify-center disabled:opacity-50"
          title="Send message"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>

      {/* Modal for Photo Preview */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="relative p-4 max-w-xl">
            <img
              src={targetUser?.photoUrl}
              alt="User Full Size"
              className="max-w-full max-h-[80vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
