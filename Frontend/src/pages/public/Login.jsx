import React from "react";
import { useState, useContext } from "react";
import { loginUser, getProfile } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(form);
    const profile = await getProfile();
    setUser(profile.data);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--card)] shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg border"
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg border"
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;