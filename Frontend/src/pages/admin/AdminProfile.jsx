import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Camera, Shield, Mail, User, LogOut } from "lucide-react";

export default function AdminProfile() {
  const { darkMode } = useTheme();
  const [user, setUser] = useState({
    name: "System Administrator",
    email: "admin@nexuseval.edu",
    role: "admin",
    profileImage: ""
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/me"); // Correct endpoint
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch admin profile:", err);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await API.put("/users/update", { name: user.name }); // Correct endpoint
      toast.success("Admin Credentials Updated");
      setEditing(false);
    } catch {
      toast.error("Cloud Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-center p-6 min-h-[calc(100vh-100px)] items-center">
      <div className={`w-full max-w-2xl transition-all duration-300 ${
        darkMode ? 'bg-[#08060f]/80 border-indigo-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-200 shadow-xl'
      } border rounded-[24px] p-8 md:p-12 relative overflow-hidden`}>
        
        {/* Decorative Background for Admin */}
        {darkMode && (
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
        )}

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
              <Shield size={28} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Administrator Profile
              </h2>
              <p className={`text-sm tracking-wider font-['JetBrains_Mono'] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Root Access • Level 1 Security
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className={`w-32 h-32 rounded-3xl overflow-hidden border-4 ${
                darkMode ? 'border-indigo-500/30 group-hover:border-indigo-500' : 'border-indigo-100 group-hover:border-indigo-200'
              } transition-all duration-300 shadow-2xl`}>
                <img
                  src={user.profileImage || "/avatar.png"}
                  alt="admin"
                  className="w-full h-full object-cover"
                />
              </div>
              {editing && (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className={`absolute -bottom-2 -right-2 p-2.5 rounded-xl shadow-lg transition hover:scale-110 ${
                    darkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'
                  }`}
                >
                  <Camera size={18} />
                </button>
              )}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`text-[10px] uppercase tracking-[3px] font-bold mb-2 block ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  Admin Identity
                </label>
                {editing ? (
                  <input
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className={`w-full p-3 rounded-xl border transition ${
                      darkMode ? 'bg-black/40 border-white/10 text-white focus:border-indigo-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500'
                    }`}
                  />
                ) : (
                  <div className={`text-lg font-['JetBrains_Mono'] font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {user.name}
                  </div>
                )}
              </div>

              <div>
                <label className={`text-[10px] uppercase tracking-[3px] font-bold mb-2 block ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  System Email
                </label>
                <div className={`text-lg font-['JetBrains_Mono'] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.email}
                </div>
              </div>

              <div>
                <label className={`text-[10px] uppercase tracking-[3px] font-bold mb-2 block ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  Security Role
                </label>
                <div className={`text-[11px] font-bold uppercase tracking-[2px] font-['JetBrains_Mono'] ${darkMode ? 'text-indigo-500/80' : 'text-indigo-600'}`}>
                  {user.role || 'Administrator'}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t dark:border-white/5 flex flex-col gap-4">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98]"
                >
                  Configure Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98]"
                >
                  {loading ? "Syncing..." : "Commit Changes"}
                </button>
              )}

              <button
                onClick={handleLogout}
                className={`w-full py-4 flex items-center justify-center gap-2 rounded-2xl font-bold uppercase tracking-widest text-sm transition-colors border ${
                  darkMode 
                    ? 'bg-transparent border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white' 
                    : 'bg-white border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white'
                }`}
              >
                <LogOut size={18} /> Terminate Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
