import React from "react";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <DashboardNavbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;