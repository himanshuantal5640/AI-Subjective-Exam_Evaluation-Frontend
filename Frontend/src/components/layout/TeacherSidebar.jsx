import React from "react";
import { NavLink } from "react-router-dom";

export default function TeacherSidebar({ open, setOpen }) {

  const linkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition-all ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-800/30"
    }`;

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
        fixed md:static z-50
        h-full w-64
        bg-white dark:bg-[#071a10]
        border-r border-gray-200 dark:border-green-500/20
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        <div className="p-6 text-2xl font-bold text-green-600 dark:text-green-400">
          NexusEval
        </div>

        <nav className="space-y-2 px-4">

          <NavLink to="/teacher/dashboard" className={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/teacher/create-exam" className={linkStyle}>
            Create Exam
          </NavLink>

          <NavLink to="/teacher/manage-exams" className={linkStyle}>
            Manage Exams
          </NavLink>

          <NavLink to="/teacher/students" className={linkStyle}>
            Students
          </NavLink>

          <NavLink to="/teacher/profile" className={linkStyle}>
            Profile
          </NavLink>

        </nav>
      </aside>
    </>
  );
}