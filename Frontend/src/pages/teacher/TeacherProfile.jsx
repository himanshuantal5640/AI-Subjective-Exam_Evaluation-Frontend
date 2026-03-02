import React, { useEffect, useState, useRef } from "react";
import { getTeacherProfile, updateTeacherProfile } from "../../services/teacherService";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

export default function TeacherProfile() {
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
    <div className="flex justify-center p-6 bg-[#020509] min-h-screen">

      <div className="w-full max-w-2xl 
      bg-[#07100a] 
      border border-green-500/10
      rounded-3xl shadow-2xl p-8 transition-all">

        <h2 className="text-2xl font-semibold mb-8 text-green-400">
          Teacher Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8 relative">

          <div className="relative">
            <img
              src={user.profileImage || "/avatar.png"}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover 
              border-4 border-green-500 shadow-lg"
            />

            {editing && (
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 
                bg-green-500 p-2 rounded-full shadow-lg text-black"
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
          <label className="text-sm text-gray-400">
            Full Name
          </label>

          {editing ? (
            <input
              value={user.name || ""}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
              className="w-full mt-2 p-3 rounded-xl 
              bg-[#0b1610] 
              text-white 
              border border-green-500/20
              focus:border-green-400 outline-none transition"
            />
          ) : (
            <p className="mt-2 text-white text-lg">
              {user.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-8">
          <label className="text-sm text-gray-400">
            Email
          </label>
          <p className="mt-2 text-gray-300">
            {user.email}
          </p>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="w-full py-3 bg-gradient-to-r 
            from-green-400 to-emerald-500 
            text-black rounded-xl font-semibold 
            hover:scale-105 transition"
          >
            Update Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="w-full py-3 bg-gradient-to-r 
            from-green-400 to-emerald-500 
            text-black rounded-xl font-semibold 
            hover:scale-105 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-500 hover:bg-red-600
          text-white rounded-xl mt-4 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}