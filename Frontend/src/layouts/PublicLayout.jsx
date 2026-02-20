import React from "react";
import PublicNavbar from "../components/navbar/PublicNavbar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <Outlet />
    </div>
  );
};

export default PublicLayout;