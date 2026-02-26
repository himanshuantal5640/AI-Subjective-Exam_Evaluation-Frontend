import React, { useEffect, useState } from "react";
import { getChatHistory } from "../../services/chatService";
import { X } from "lucide-react";

export default function ChatWindow({ setChatOpen }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadChat();
  }, []);

  const loadChat = async () => {
    const userId = "teacher-id"; // replace later dynamically
    const { data } = await getChatHistory(userId);
    setMessages(data);
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-[#0d1825] rounded-xl shadow-lg border dark:border-white/10 flex flex-col">
      <div className="flex justify-between p-3 border-b dark:border-white/10">
        <h4>Chat</h4>
        <X onClick={() => setChatOpen(false)} />
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <p key={i} className="mb-2 text-sm">
            {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
}