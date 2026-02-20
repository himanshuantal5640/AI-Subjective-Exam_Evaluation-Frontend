import React from "react";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        AI Powered Exam Evaluation
      </h1>

      <p className="max-w-xl text-gray-600 dark:text-gray-300 mb-8">
        Hybrid AI + Rule-based scoring with human override and full audit tracking.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/register"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="border border-indigo-600 px-6 py-3 rounded-lg"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Home;