import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { PhotoDialog } from "./UI";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMessageSquare } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";

const EMPTY_CONNECTIONS = [];

const Chat = () => {
  const { targetUserId } = useParams();
  const [loadError, setLoadError] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [targetUser, setTargetUser] = useState(null);

  const user = useSelector((store) => store.user);
  const chatUserList = useSelector((store) => store.connections) || EMPTY_CONNECTIONS;
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
      setLoadingMessages(true);
      setLoadError("");
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
      } catch {
        setLoadError("We could not load your conversation. Reload the page to try again.");
      } finally { setLoadingMessages(false); }
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
  }, [userId, targetUserId, user?.firstName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
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
    <main className="dm-chat" aria-label="Conversation">
      <header className="dm-chat-header">
        <Link to="/connections" className="dm-icon-button" aria-label="Back to connections"><FiArrowLeft /></Link>
        <button className="dm-chat-avatar" onClick={() => setShowModal(true)} disabled={!targetUser?.photoUrl} aria-label="View profile photo">{targetUser?.photoUrl ? <img src={targetUser.photoUrl} alt="" /> : targetUser?.firstName?.[0] || "D"}</button>
        <div><h1>{targetUser?.firstName || "Conversation"}</h1><p>Direct message</p></div>
      </header>
      <div className="dm-chat-messages" role="log" aria-label="Messages" aria-live="polite">
        {loadError && <p role="alert" className="dm-alert">{loadError}</p>}
        {loadingMessages && <p role="status" className="dm-muted">Loading conversation...</p>}
        {!loadingMessages && !loadError && messages.length === 0 && <div className="dm-chat-empty"><FiMessageSquare /><h2>A conversation starts with hello.</h2><p>Share an idea or ask what they are working on.</p></div>}
        {messages.map((msg, index) => {
          const isOwn = msg.firstName === user?.firstName;
          return <div key={index} className={`flex mb-4 ${isOwn ? "justify-end" : "justify-start"}`}><div className={`dm-message ${isOwn ? "dm-message-own" : ""}`}><p className="dm-message-name">{msg.firstName || "User"}</p><p className="whitespace-pre-wrap">{msg.text}</p>{msg.timestamp && <p className="dm-message-time">{moment(msg.timestamp).format("hh:mm A")}</p>}</div></div>;
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="dm-composer">
        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder="Write a message..." aria-label="Message" rows={2} />
        <button onClick={sendMessage} disabled={!newMessage.trim() || !userId} className="dm-button" aria-label="Send message"><FaPaperPlane /></button>
      </div>
      {showModal && <PhotoDialog src={targetUser?.photoUrl} name={targetUser?.firstName} onClose={() => setShowModal(false)} />}
    </main>
  );
};
export default Chat;
