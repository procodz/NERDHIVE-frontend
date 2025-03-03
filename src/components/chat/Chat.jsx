import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messageEndRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id || user?.user?._id;
  const firstName = user?.firstName || user?.user?.firstName;

  const { targetUserId } = useParams();



  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {withCredentials: true});
      const formattedMessages = chat.data?.messages.map((msg) => ({ 
        sender: msg.senderId._id, // Use the _id from the senderId object
        text: msg.text,
        timestamp: msg.createdAt // Use createdAt instead of timestamp
      }));
      setMessages(formattedMessages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    // Create socket connection
    const newSocket = createSocketConnection();
    setSocket(newSocket);

    // Join chat room
    newSocket.emit("joinChat", { firstName, userId, targetUserId });

    // Message handler
    const handleReceivedMessage = (messageData) => {
      // Only add messages from the other user
      if (messageData.userId !== userId) {
        setMessages(prev => [...prev, {
          sender: messageData.userId,
          text: messageData.text,
          timestamp: new Date().toISOString()
        }]);
      }
    };

    // Set up event listener
    newSocket.on("messagereceived", handleReceivedMessage);

    // Cleanup function
    return () => {
      newSocket.off("messagereceived", handleReceivedMessage);
      newSocket.disconnect();
    };
  }, [userId, targetUserId, firstName]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    
    if (!trimmedMessage || !socket) return;

    const messageData = {
      firstName,
      userId,
      targetUserId,
      text: trimmedMessage,
      timestamp: new Date().toISOString()
    };

    // Send message through socket
    socket.emit("sendMessage", messageData);

    // Add to local state immediately for sender
    setMessages(prev => [...prev, {
      sender: userId,
      text: trimmedMessage,
      timestamp: messageData.timestamp
    }]);

    // Clear input
    setNewMessage("");
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-base-200 rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-base-300">
          <h2 className="text-xl font-bold">Chat</h2>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.timestamp + index}
              className={`flex ${msg.sender === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === userId
                    ? "bg-primary text-primary-content"
                    : "bg-base-300"
                }`}
              >
                <p className="break-words">{msg.text}</p>
                <div 
                  className={`text-xs mt-1 ${
                    msg.sender === userId 
                      ? "text-primary-content/70" 
                      : "text-base-content/70"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} /> {/* Scroll anchor */}
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-base-300"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input input-bordered flex-1"
              maxLength={1000}
            />
            <button 
              type="submit" 
              className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-1.5 rounded-md text-sm font-normal transition-all"
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;