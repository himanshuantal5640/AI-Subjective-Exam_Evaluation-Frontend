import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import LandingPage from "./pages/LandingPage";
import Portals from "./components/landing/Portals";
import Features from "./components/landing/Features";
import HowItWorks from "./components/landing/HowItWorks";
import AISection from "./components/landing/AISection";
import Testimonials from "./components/landing/Testimonials";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";

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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
