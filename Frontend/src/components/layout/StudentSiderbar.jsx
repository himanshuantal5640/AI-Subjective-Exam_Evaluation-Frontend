import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, User, BarChart } from "lucide-react";

export default function StudentSidebar() {
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20";

  return (
    <aside className="w-64 bg-white/70 dark:bg-[#0b1622]/80 backdrop-blur-xl border-r dark:border-white/10 p-5 hidden md:block">

      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-10">
        Student Portal
      </h1>

      <nav className="flex flex-col gap-3 text-gray-700 dark:text-gray-300">

        <NavLink to="/student/dashboard" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/student/exams" className={linkClass}>
          <BookOpen size={18} />
          Exams
        </NavLink>

        <NavLink to="/student/results" className={linkClass}>
          <BarChart size={18} />
          Results
        </NavLink>

        <NavLink to="/student/profile" className={linkClass}>
          <User size={18} />
          Profile
        </NavLink>

      </nav>
    </aside>
  );
}