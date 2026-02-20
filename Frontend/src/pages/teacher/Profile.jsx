import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const TeacherProfile = () => {
  const { user, setUser, logout } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name,
    password: "",
  });

  const handleUpdate = async () => {
    await api.put("/users/update", form);

    setUser({ ...user, name: form.name });
    setEditMode(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-[var(--card)] p-6 rounded-xl shadow space-y-6">

      <h2 className="text-xl font-semibold">Profile</h2>

      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      {editMode ? (
        <>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="New Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
          />

          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
};

export default TeacherProfile;