import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import StudentLayout from "../layouts/StudentLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import StudentDashboard from "../pages/student/Dashboard";
import Results from "../pages/student/Results";
import VerifyOTP from "../pages/public/VerifyOTP";
import Exams from "../pages/student/Exams";
import Profile from "../pages/student/Profile";
import TeacherDashboard from "../pages/teacher/Dashboard";
import Review from "../pages/teacher/Review";
import Analytics from "../pages/teacher/Analytics";
import TeacherLayout from "../layouts/TeacherLayout";
import TeacherProfile from "../pages/teacher/Profile";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import AuditLogs from "../pages/admin/AuditLogs";
import AdminProfile from "../pages/admin/Profile"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route element={<StudentLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/results" element={<Results />} />
            <Route path="/student/exams" element={<Exams />} />
            <Route path="/student/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route element={<TeacherLayout />}>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/review" element={<Review />} />
            <Route path="/teacher/analytics" element={<Analytics />} />
            <Route path="/teacher/profile" element={<TeacherProfile />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
  <Route element={<AdminLayout />}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/users" element={<Users />} />
    <Route path="/admin/audit-logs" element={<AuditLogs />} />
    <Route path="/admin/profile" element={<AdminProfile />} />
  </Route>
</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
