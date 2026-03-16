import React from 'react';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className="text-[28px] md:text-[34px] font-bold font-['Orbitron'] text-white tracking-[1px] leading-tight">
            System Settings
          </h1>
          <p className="text-[rgba(220,200,255,0.58)] font-['JetBrains_Mono'] text-[13px] mt-[6px]">
            Global configuration and environment parameters
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#dc50ff] to-[#ff3d6e] hover:shadow-[0_0_20px_rgba(220,80,255,0.4)] text-white px-[24px] py-[12px] rounded-[12px] font-bold font-['JetBrains_Mono'] text-[13px] tracking-[1px] uppercase transition-all duration-300">
          Save Changes
        </button>
      </div>

      <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] border border-[#dc50ff]/10 p-8 space-y-8">
        
        <div>
          <h2 className="text-xl font-bold font-['Orbitron'] text-white mb-4 border-b border-[#dc50ff]/20 pb-2 flex items-center gap-2">
            <span className="text-[#38d9ff]">{"//"}</span> AI Evaluation Engine
          </h2>
          <div className="space-y-4 font-['JetBrains_Mono']">
            <div className="flex justify-between items-center text-gray-300">
              <span>Enable Hybrid Scoring</span>
              <input type="checkbox" className="w-5 h-5 accent-[#dc50ff]" defaultChecked />
            </div>
             <div className="flex justify-between items-center text-gray-300">
              <span>AI Confidence Threshold</span>
              <select className="bg-[#110e1c] border border-gray-600 rounded px-3 py-1 text-white">
                <option>High (90%+)</option>
                <option>Medium (75%+)</option>
                <option>Low (Any)</option>
              </select>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Auto-flag low confidence grades for teacher review</span>
              <input type="checkbox" className="w-5 h-5 accent-[#dc50ff]" defaultChecked />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold font-['Orbitron'] text-white mb-4 border-b border-[#dc50ff]/20 pb-2 flex items-center gap-2">
            <span className="text-[#ffb830]">{"//"}</span> Security & Access
          </h2>
          <div className="space-y-4 font-['JetBrains_Mono']">
            <div className="flex justify-between items-center text-gray-300">
              <span>Require OTP verification for faculty</span>
              <input type="checkbox" className="w-5 h-5 accent-[#ffb830]" defaultChecked />
            </div>
            <div className="flex flex-col gap-2 text-gray-300">
              <span>Session Timeout (minutes)</span>
              <input type="number" defaultValue={60} className="w-32 bg-[#110e1c] border border-gray-600 rounded px-3 py-1 text-white" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
