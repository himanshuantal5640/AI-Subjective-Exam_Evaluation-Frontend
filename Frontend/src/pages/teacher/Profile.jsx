import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const TeacherProfile = () => {
  const { user, setUser, logout } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    password: "",
  });

  const handleUpdate = async () => {
    await api.put("/users/update", form);

    setUser({
      ...user,
      name: form.name,
    });

    setEditMode(false);
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await api.post("/users/upload-image", formData);

    setUser({ ...user, profileImage: res.data.image });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Profile Card */}
      <div className="bg-[var(--card)] p-6 rounded-xl shadow">

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={
              user?.profileImage ||
              "https://via.placeholder.com/120"
            }
            className="w-28 h-28 rounded-full object-cover"
          />

          {editMode && (
            <input
              type="file"
              onChange={handleImageUpload}
              className="text-sm"
            />
          )}
        </div>

        <div className="mt-6 space-y-4">

          <div>
            <label className="text-sm text-gray-500">
              Name
            </label>
            {editMode ? (
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
            ) : (
              <p className="text-lg font-medium">
                {user?.name}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Email
            </label>
            <p className="text-lg">{user?.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Role
            </label>
            <p className="text-lg capitalize">
              {user?.role}
            </p>
          </div>

          {editMode && (
            <div>
              <label className="text-sm text-gray-500">
                New Password
              </label>
              <input
                type="password"
                placeholder="Leave empty to keep same"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>
          )}

        </div>

        <div className="flex gap-4 mt-6">

          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Update Profile
            </button>
          )}

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default TeacherProfile;