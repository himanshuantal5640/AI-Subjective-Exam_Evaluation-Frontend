
import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white/70 dark:bg-[#0d1825]/80 backdrop-blur-xl 
    p-6 rounded-2xl border dark:border-white/10 shadow-lg 
    hover:shadow-cyan-500/20 transition-all duration-300">

      <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-2">
        {title}
      </h3>

      <p className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
        {value}
      </p>

    </div>
  );
}