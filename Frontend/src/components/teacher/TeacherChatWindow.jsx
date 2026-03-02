import React, { useState } from "react";
import { X, Send } from "lucide-react";

export default function TeacherChatWindow({ close }) {
  const [message, setMessage] = useState("");
  const [chatWith, setChatWith] = useState("student");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Send to:", chatWith, message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 z-50
    bg-white dark:bg-[#07100a]
    border border-gray-200 dark:border-green-500/20
    rounded-2xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center p-4
      bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold">
        <span>Teacher Chat</span>
        <X className="cursor-pointer" onClick={close} size={18} />
      </div>

      {/* Role Selector */}
      <div className="p-3 border-b dark:border-green-500/20">
        <select
          value={chatWith}
          onChange={(e) => setChatWith(e.target.value)}
          className="w-full p-2 rounded-lg
          bg-gray-100 dark:bg-[#0b1610]
          text-gray-800 dark:text-white"
        >
          <option value="student">Talk to Student</option>
          <option value="admin">Talk to Admin</option>
        </select>
      </div>

      {/* Messages Area */}
      <div className="h-48 overflow-y-auto p-4 text-sm text-gray-600 dark:text-gray-300">
        No messages yet...
      </div>

      {/* Input */}
      <div className="flex items-center p-3 border-t dark:border-green-500/20">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 p-2 rounded-lg
          bg-gray-100 dark:bg-[#0b1610]
          text-gray-800 dark:text-white outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-green-500 p-2 rounded-lg text-black"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}