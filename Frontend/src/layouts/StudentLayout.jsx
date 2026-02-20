import React from "react";
import StudentSidebar from "../components/sidebar/StudentSidebar";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <div className="flex-1">
        <DashboardNavbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;