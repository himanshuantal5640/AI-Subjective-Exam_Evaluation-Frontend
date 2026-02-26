

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";


import LandingPage from "./pages/LandingPage";
import Portals from "./components/landing/Portals";
import Features from "./components/landing/Features";
import HowItWorks from "./components/landing/HowItWorks";
import AISection from "./components/landing/AISection";
import Testimonials from "./components/landing/Testimonials";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";


import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExams from "./pages/student/StudentExams";
import StudentProfile from "./pages/student/StudentProfile";

import ProtectedRoute from "./routes/ProtectedRoute";
import StudentResults from "./pages/student/StudentResults";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>

          
          <Route path="/" element={<LandingPage />} />
          <Route path="/portals" element={<Portals />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how" element={<HowItWorks />} />
          <Route path="/ai" element={<AISection />} />
          <Route path="/testimonials" element={<Testimonials />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

        
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

          
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;