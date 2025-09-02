import { useState } from "react";

const MessagePage = () => {
  // Sample conversation data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Alex Morgan",
      lastMessage: "Looking forward to meeting tomorrow!",
      time: "2:45 PM",
      unread: 0,
      avatar: "AM",
      active: true,
    },
    {
      id: 2,
      name: "Taylor Swift",
      lastMessage: "The new album is dropping next week",
      time: "11:30 AM",
      unread: 3,
      avatar: "TS",
      active: false,
    },
    {
      id: 3,
      name: "John Doe",
      lastMessage: "Thanks for your help with the project",
      time: "Yesterday",
      unread: 0,
      avatar: "JD",
      active: false,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      lastMessage: "Are we still on for Friday?",
      time: "Yesterday",
      unread: 1,
      avatar: "SJ",
      active: false,
    },
  ]);

  // Sample messages for the active conversation
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      text: "Hey there! How are you doing?",
      time: "2:30 PM",
    },
    {
      id: 2,
      sender: "me",
      text: "I'm good, thanks! Just working on some new designs.",
      time: "2:32 PM",
    },
    {
      id: 3,
      sender: "other",
      text: "That's great! Looking forward to seeing them.",
      time: "2:33 PM",
    },
    {
      id: 4,
      sender: "me",
      text: "I'll send them over later today.",
      time: "2:35 PM",
    },
    {
      id: 5,
      sender: "other",
      text: "Perfect! Looking forward to meeting tomorrow!",
      time: "2:45 PM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "me",
        text: newMessage,
        time: "Just now",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className=" mx-auto h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]">
        <div className="flex flex-col md:flex-row h-full rounded-2xl overflow-hidden shadow-2xl">
          {/* Sidebar - Conversations List */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col bg-white/10 backdrop-blur-lg border-r border-white/20">
            <div className="p-4 border-b border-white/20">
              <h1 className="text-2xl font-bold text-white">Messages</h1>
              <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-3.5 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer transition ${
                    conversation.active ? "bg-white/10" : ""
                  }`}
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {conversation.avatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-white truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-white/70">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="ml-2 flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 text-xs text-white font-bold">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-lg">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/20 flex items-center">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                  AM
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Alex Morgan
                </h2>
                <p className="text-xs text-white/70">Online</p>
              </div>
              <div className="ml-auto flex space-x-2">
                <button className="p-2 rounded-full hover:bg-white/10 text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-white/10 text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-white/10 text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === "me"
                        ? "bg-white/20 text-white rounded-tr-none"
                        : "bg-white/10 text-white rounded-tl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs text-white/60 mt-1 text-right">
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center">
                <button className="p-2 rounded-full hover:bg-white/10 text-white">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <div className="mx-2 flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none max-h-32"
                    rows={1}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
