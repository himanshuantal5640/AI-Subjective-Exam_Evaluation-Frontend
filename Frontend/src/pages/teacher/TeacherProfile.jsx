import React, { useEffect, useState, useRef } from "react";
import { getTeacherProfile, updateTeacherProfile } from "../../services/teacherService";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function TeacherProfile() {
  const { darkMode } = useTheme();
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getTeacherProfile();
      setUser(data);
    } catch {
      toast.error("Failed to load profile");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateTeacherProfile({
        name: user.name,
      });

      toast.success("Profile Updated Successfully");
      setEditing(false);
    } catch {
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await updateTeacherProfile(formData);
      toast.success("Profile Photo Updated");
      fetchProfile();
    } catch {
      toast.error("Image Upload Failed");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-center p-6 min-h-screen">
      <div className={`w-full max-w-2xl ${
        darkMode ? 'bg-[#07100a] border-green-500/10 shadow-2xl text-white' : 'bg-white border-gray-200 shadow-xl text-gray-800'
      } border rounded-3xl p-8 transition-all duration-300`}>

        <h2 className={`text-2xl font-semibold mb-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
          Teacher Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative group">
            <img
              src={user.profileImage || "/avatar.png"}
              alt="profile"
              className={`w-28 h-28 rounded-full object-cover border-4 ${
                darkMode ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-green-100 shadow-md'
              } transition-all duration-300`}
            />

            {editing && (
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full shadow-lg text-black hover:scale-110 transition"
              >
                <Camera size={16} />
              </button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Full Name
          </label>

          {editing ? (
            <input
              value={user.name || ""}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
              className={`w-full mt-2 p-3 rounded-xl ${
                darkMode ? 'bg-[#0b1610] text-white border-green-500/20 focus:border-green-400' : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-green-500'
              } border outline-none transition`}
            />
          ) : (
            <p className={`mt-2 font-medium text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {user.name}
            </p>
          )}
        </div>

    {/* Email */}
    <div className="mb-4">
      <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Email Address
      </label>
      <p className={`mt-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {user.email}
      </p>
    </div>

    {/* Role */}
    <div className="mb-8">
      <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Official Role
      </label>
      <p className={`mt-2 font-black uppercase tracking-widest text-xs ${darkMode ? 'text-green-500/80' : 'text-green-600'}`}>
        {user.role || 'Teacher'}
      </p>
    </div>

        <div className="space-y-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all active:scale-95"
            >
              Update Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all active:scale-95"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}

          <button
            onClick={handleLogout}
            className={`w-full py-3 ${
              darkMode ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
            } rounded-xl font-semibold transition active:scale-95`}
          >
            Logout session
          </button>
        </div>

      </div>
    </div>
  );
}