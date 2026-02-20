import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-[var(--card)] shadow-lg p-6">
      <h2 className="text-xl font-bold mb-8">Admin</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/audit-logs">Audit Logs</Link>
        <Link to="/admin/profile">Profile</Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;