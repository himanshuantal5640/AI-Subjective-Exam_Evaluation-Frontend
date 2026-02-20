import React from "react";
import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  deactivateUser,
} from "../../services/adminService";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <div className="bg-[var(--card)] p-6 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">All Users</h3>

      {users.map(user => (
        <div
          key={user._id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <p>{user.name}</p>
            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          <div className="flex gap-4 items-center">

            <select
              value={user.role}
              onChange={(e) =>
                updateUserRole(user._id, e.target.value)
              }
              className="border p-2 rounded"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={() => deactivateUser(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Deactivate
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;