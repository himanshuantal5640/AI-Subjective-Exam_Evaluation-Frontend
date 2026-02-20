import React from "react";
import TeacherSidebar from "../components/sidebar/TeacherSidebar";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
import { Outlet } from "react-router-dom";

const TeacherLayout = () => {
  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <div className="flex-1">
        <DashboardNavbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;