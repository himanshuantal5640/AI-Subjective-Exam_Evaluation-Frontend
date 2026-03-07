import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Landing
import LandingPage from "./pages/LandingPage";
import Portals from "./components/landing/Portals";
import Features from "./components/landing/Features";
import HowItWorks from "./components/landing/HowItWorks";
import AISection from "./components/landing/AISection";
import Testimonials from "./components/landing/Testimonials";

// Auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";

// Student
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExams from "./pages/student/StudentExams";
import StudentProfile from "./pages/student/StudentProfile";
import StudentResults from "./pages/student/StudentResults";

// Teacher
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateExam from "./pages/teacher/CreateExam";
import ManageExams from "./pages/teacher/ManageExams";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import ReviewAnswers from "./pages/teacher/ReviewAnswers";
import TeacherAnalytics from "./pages/teacher/TeacherAnalytics";
import ManageQuestions from "./pages/teacher/ManageQuestions";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>

          {/* ================= LANDING ================= */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/portals" element={<Portals />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how" element={<HowItWorks />} />
          <Route path="/ai" element={<AISection />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* ================= STUDENT PORTAL ================= */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="exams" element={<StudentExams />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="results" element={<StudentResults />} />
          </Route>

          {/* ================= TEACHER PORTAL ================= */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="create" element={<CreateExam />} />
            <Route path="manage" element={<ManageExams />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="exam/:examId/questions" element={<ManageQuestions />} />
            <Route path="review/:examId" element={<ReviewAnswers />} />
            <Route path="analytics/:examId" element={<TeacherAnalytics />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;