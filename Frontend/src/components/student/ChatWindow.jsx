import React, { useEffect, useState, useRef } from "react";
import { getChatHistory, sendMessage, getContacts } from "../../services/chatService";
import { X, Send, Loader, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatWindow({ setChatOpen }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const { data } = await getContacts("teacher");
      setTeachers(data);
      if (data.length > 0) setSelectedTeacher(data[0]);
    } catch (err) {
      toast.error("Failed to load teachers");
    }
  };

  useEffect(() => {
    if (!selectedTeacher) return;
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { data } = await getChatHistory(selectedTeacher._id);
        setMessages(data);
      } catch (err) {
        console.error("History fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, [selectedTeacher]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || !selectedTeacher) return;
    try {
      const { data } = await sendMessage(selectedTeacher._id, message);
      setMessages([...messages, data]);
      setMessage("");
    } catch (err) {
      toast.error("Send Failed");
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-[18rem] sm:w-[22rem] z-50 bg-white dark:bg-[#0b1622] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border dark:border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-white/10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} />
          <h4 className="font-bold text-sm tracking-wide">Academic Chat</h4>
        </div>
        <X className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setChatOpen(false)} size={18} />
      </div>

      {/* Recipient Selecor */}
      <div className="p-3 border-b dark:border-white/10 bg-gray-50 dark:bg-black/20">
        <select
          value={selectedTeacher?._id || ""}
          onChange={(e) => setSelectedTeacher(teachers.find(t => t._id === e.target.value))}
          className="w-full p-2 rounded-lg text-xs font-medium bg-white dark:bg-[#1a2533] text-gray-800 dark:text-white border dark:border-white/10 outline-none"
        >
          {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto min-h-[16rem] max-h-[22rem] space-y-3 custom-scrollbar">
        {loading && messages.length === 0 ? (
          <div className="flex justify-center py-10"><Loader className="animate-spin text-cyan-500" /></div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-xs text-gray-400">
            Start a conversation with your faculty lead.
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === selectedTeacher?._id ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-2.5 rounded-2xl text-xs md:text-sm shadow-sm ${
                m.sender === selectedTeacher?._id
                  ? 'bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  : 'bg-cyan-500 text-white rounded-br-none'
              }`}>
                {m.message}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t dark:border-white/10 bg-gray-50 dark:bg-black/20">
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type message..."
            className="flex-1 p-2 rounded-xl text-sm bg-white dark:bg-[#1a2533] text-gray-800 dark:text-white border dark:border-white/10 outline-none"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}