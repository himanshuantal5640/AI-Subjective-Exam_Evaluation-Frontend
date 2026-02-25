import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Stats from "../components/landing/Stats";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";
import AISection from "../components/landing/AISection";
import HowItWorks from "../components/landing/HowItWorks";
import Portals from "../components/landing/Portals";
import Testimonials from "../components/landing/Testimonials";

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-[#010308] text-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <AISection/>
      <Portals/>
      <HowItWorks/>
      <Testimonials/>
      <CTA />
      <Footer />
    </div>
  );
}