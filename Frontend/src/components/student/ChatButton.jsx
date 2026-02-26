

import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { text: message, sender: "student" }]);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r 
        from-cyan-500 to-purple-500 
        p-4 rounded-full shadow-lg cursor-pointer 
        text-white z-50 hover:scale-110 transition"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 
        bg-white dark:bg-[#0d1825] 
        rounded-2xl shadow-2xl 
        border border-gray-200 dark:border-white/10 
        flex flex-col z-50">

          <div className="p-4 border-b dark:border-white/10 font-semibold">
            Chat with Teacher
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-2">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center mt-10">
                Start conversation 👋
              </p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-cyan-500 text-white 
                  px-3 py-2 rounded-lg w-fit ml-auto"
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          {/* Input + Send */}
          <div className="p-3 border-t dark:border-white/10 flex items-center gap-2">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              className="flex-1 p-2 rounded-lg 
              bg-gray-100 dark:bg-[#1a1a1a] 
              text-gray-800 dark:text-white"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="bg-gradient-to-r 
              from-cyan-500 to-purple-500 
              p-2 rounded-lg text-white 
              hover:scale-105 transition"
            >
              <Send size={18} />
            </button>

          </div>
        </div>
      )}
    </>
  );
}