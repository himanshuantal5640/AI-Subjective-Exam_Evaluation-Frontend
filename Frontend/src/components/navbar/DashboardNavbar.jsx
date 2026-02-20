import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const DashboardNavbar = () => {
  const { logout } = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex justify-between items-center bg-[var(--card)] px-6 py-4 shadow">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex gap-4 items-center">
        <button onClick={toggleTheme}>🌙</button>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;