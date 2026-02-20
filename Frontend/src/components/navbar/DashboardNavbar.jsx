import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const DashboardNavbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex justify-between items-center bg-[var(--card)] px-6 py-4 shadow">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {theme === "dark" ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </button>
    </div>
  );
};

export default DashboardNavbar;