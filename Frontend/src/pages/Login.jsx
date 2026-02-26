

import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/ui/AuthCard";
import InputField from "../components/ui/InputField";
import Spinner from "../components/ui/Spinner";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error("All fields required");
    }

    try {
      setLoading(true);

      const { data } = await loginUser(form);

      toast.success("Login Successful 🎉");

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Login">

      <select
        name="role"
        onChange={handleChange}
        className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-cyan-500"
      >
        <option>student</option>
        <option>teacher</option>
        <option>admin</option>
      </select>

      <InputField
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        passwordToggle={false}
      />

      <InputField
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        passwordToggle
      />

      <div className="text-right text-sm mb-4">
        <Link to="/forgot-password" className="text-cyan-500 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        onClick={handleLogin}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold flex justify-center items-center hover:opacity-90 transition"
      >
        {loading ? <Spinner /> : "Login"}
      </button>

      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-cyan-500 hover:underline">
          Create one
        </Link>
      </p>
    </AuthCard>
  );
}