import React from "react";
import { Link } from "react-router-dom";

const TeacherSidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-[var(--card)] shadow-lg p-6">
      <h2 className="text-xl font-bold mb-8">Teacher</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/teacher/dashboard">Dashboard</Link>
        <Link to="/teacher/review">Review Answers</Link>
        <Link to="/teacher/analytics">Analytics</Link>
        <Link to="/teacher/profile">Profile</Link>
      </nav>
    </aside>
  );
};

export default TeacherSidebar;