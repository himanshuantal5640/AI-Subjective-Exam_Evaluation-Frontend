import React from "react";
import { Link } from "react-router-dom";

const StudentSidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-[var(--card)] shadow-lg p-6">
      <h2 className="text-xl font-bold mb-8">Student</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/student/dashboard">Dashboard</Link>
        <Link to="/student/exams">Exams</Link>
        <Link to="/student/results">Results</Link>
        <Link to="/student/profile">Profile</Link>
      </nav>
    </aside>
  );
};

export default StudentSidebar;