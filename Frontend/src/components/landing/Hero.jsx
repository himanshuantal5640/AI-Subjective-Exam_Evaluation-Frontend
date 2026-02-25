import React from "react";
export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32">
      <h1 className="text-5xl md:text-7xl font-bold">
        <span className="block">Exam Intelligence</span>
        <span className="block bg-gradient-to-r from-cyan-500 via-purple-500 to-green-400 bg-clip-text text-transparent">
          Redefined
        </span>
      </h1>

      <p className="max-w-xl text-gray-600 dark:text-white/70 mt-6">
        AI precision meets human expertise.
      </p>

      <button className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold">
        Get Started
      </button>
    </section>
  );
}