import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";

function Chat() {
  const [messages, setMessages] = useState([{ text: "hello" }]);
  const user = useSelector(store => store.user);
  const userId = user?._id;

  const { targetUserId } = useParams();


  useEffect(() =>{
    const socket = createSocketConnection();
    // as soon as page loads the socket connection will be made and we will join the chat
    socket.emit("joinChat", {userId, targetUserId});

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-base-200 rounded-lg shadow-xl">
        {/* Chat Header */}
        <div className="p-4 border-b border-base-300">
          <h2 className="text-xl font-bold">Chat</h2>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-content"
                    : "bg-base-300"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-base-300">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered flex-1"
            />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
