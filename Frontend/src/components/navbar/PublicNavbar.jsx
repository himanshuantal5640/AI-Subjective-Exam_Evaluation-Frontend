import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const PublicNavbar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[var(--card)] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          AI Eval
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/login">Login</Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Register
          </Link>
          <button onClick={toggleTheme}>🌙</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;