import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function AdminSettings() {
  const { darkMode } = useTheme();
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className={`text-[28px] md:text-[34px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-[1px] leading-tight`}>
            System Settings
          </h1>
          <p className={`${darkMode ? 'text-[rgba(220,200,255,0.58)]' : 'text-gray-500'} font-['JetBrains_Mono'] text-[13px] mt-[6px]`}>
            Global configuration and environment parameters
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#dc50ff] to-[#ff3d6e] hover:shadow-[0_0_20px_rgba(220,80,255,0.4)] text-white px-[24px] py-[12px] rounded-[12px] font-bold font-['JetBrains_Mono'] text-[13px] tracking-[1px] uppercase transition-all duration-300">
          Save Changes
        </button>
      </div>

      <div className={`${darkMode ? 'bg-[#08060f]/80 border-[#dc50ff]/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'} backdrop-blur-md rounded-[18px] border p-8 space-y-8`}>
        
        <div>
          <h2 className={`text-xl font-bold font-['Orbitron'] ${darkMode ? 'text-white border-[#dc50ff]/20' : 'text-gray-900 border-gray-100'} mb-4 border-b pb-2 flex items-center gap-2`}>
            <span className="text-[#38d9ff]">{"//"}</span> AI Evaluation Engine
          </h2>
          <div className="space-y-4 font-['JetBrains_Mono']">
            <div className={`flex justify-between items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Enable Hybrid Scoring</span>
              <input type="checkbox" className="w-5 h-5 accent-[#dc50ff]" defaultChecked />
            </div>
             <div className={`flex justify-between items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>AI Confidence Threshold</span>
              <select className={`${darkMode ? 'bg-[#110e1c] border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded px-3 py-1 ${darkMode ? 'text-white' : 'text-gray-900'} focus:outline-none focus:border-[#dc50ff]`}>
                <option style={{ background: darkMode ? '#110e1c' : '#fff' }}>High (90%+)</option>
                <option style={{ background: darkMode ? '#110e1c' : '#fff' }}>Medium (75%+)</option>
                <option style={{ background: darkMode ? '#110e1c' : '#fff' }}>Low (Any)</option>
              </select>
            </div>
            <div className={`flex justify-between items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Auto-flag low confidence grades for teacher review</span>
              <input type="checkbox" className="w-5 h-5 accent-[#dc50ff]" defaultChecked />
            </div>
          </div>
        </div>

        <div>
          <h2 className={`text-xl font-bold font-['Orbitron'] ${darkMode ? 'text-white border-[#dc50ff]/20' : 'text-gray-900 border-gray-100'} mb-4 border-b pb-2 flex items-center gap-2`}>
            <span className="text-[#ffb830]">{"//"}</span> Security & Access
          </h2>
          <div className="space-y-4 font-['JetBrains_Mono']">
            <div className={`flex justify-between items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Require OTP verification for faculty</span>
              <input type="checkbox" className="w-5 h-5 accent-[#ffb830]" defaultChecked />
            </div>
            <div className={`flex flex-col gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Session Timeout (minutes)</span>
              <input type="number" defaultValue={60} className={`w-32 ${darkMode ? 'bg-[#110e1c] border-gray-600' : 'bg-gray-50 border-gray-200 shadow-sm'} border rounded px-3 py-1 ${darkMode ? 'text-white' : 'text-gray-900'} focus:outline-none focus:border-[#ffb830] transition-colors`} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
