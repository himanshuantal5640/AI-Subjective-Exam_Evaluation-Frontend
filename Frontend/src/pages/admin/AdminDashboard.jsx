import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import API from '../../services/api';

export default function AdminDashboard() {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExams: 0,
    activeExams: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/system-analytics");
        setStats({
          totalUsers: data.totalUsers || 0,
          totalExams: data.totalExams || 0,
          activeExams: data.activeExams || 0,
        });
      } catch (err) {
        console.error("Failed to fetch system analytics:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className={`text-[28px] md:text-[34px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-[1px] leading-tight flex items-center gap-[14px]`}>
            System Overview 
            <span className="inline-block w-[10px] h-[10px] bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)] animate-pulse"></span>
          </h1>
          <p className={`${darkMode ? 'text-indigo-400/60' : 'text-gray-500'} font-['JetBrains_Mono'] text-[13px] mt-[6px]`}>
            Secure environment • Node Gamma-X • <span className="text-indigo-500">Authorized</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[22px] mb-[32px]">
        {/* Stat Card 1 */}
        <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 hover:border-indigo-500/30' : 'bg-white border-gray-200 hover:border-indigo-200'} backdrop-blur-md rounded-[18px] p-[24px] border relative overflow-hidden group transition-all duration-300`}>
          <div className={`absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl ${darkMode ? 'from-indigo-500/10' : 'from-indigo-50'} to-transparent rounded-bl-full pointer-events-none group-hover:from-indigo-500/20 transition-colors duration-300`}></div>
          <div className={`text-[11px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase mb-[10px] font-['JetBrains_Mono']`}>
            Total Users
          </div>
          <div className={`text-[38px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} leading-none mb-[8px] flex items-baseline gap-[10px]`}>
             {stats.totalUsers}
            <span className="text-[12px] font-['JetBrains_Mono'] text-emerald-500 px-[6px] py-[3px] rounded-[6px] bg-emerald-500/10 border border-emerald-500/20">
              <span className="mr-[2px]">↑</span> 12%
            </span>
          </div>
          <div className={`text-[13px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} flex justify-between items-center mt-[15px]`}>
            <span>Global Network</span>
            <span className="text-indigo-500 font-['Orbitron'] opacity-50">#U-102</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 hover:border-indigo-500/30' : 'bg-white border-gray-200 hover:border-indigo-200'} backdrop-blur-md rounded-[18px] p-[24px] border relative overflow-hidden group transition-all duration-300`}>
           <div className={`absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl ${darkMode ? 'from-violet-500/10' : 'from-violet-50'} to-transparent rounded-bl-full pointer-events-none group-hover:from-violet-500/20 transition-colors duration-300`}></div>
           <div className={`text-[11px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase mb-[10px] font-['JetBrains_Mono']`}>
             Total Exams
           </div>
           <div className={`text-[38px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} leading-none mb-[8px] flex items-baseline gap-[10px]`}>
             {stats.totalExams}
             <span className="text-[12px] font-['JetBrains_Mono'] text-emerald-500 px-[6px] py-[3px] rounded-[6px] bg-emerald-500/10 border border-emerald-500/20">
               <span className="mr-[2px]">↑</span> 8%
             </span>
           </div>
           <div className={`text-[13px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} flex justify-between items-center mt-[15px]`}>
             <span>Master Tests</span>
             <span className="text-violet-500 font-['Orbitron'] opacity-50">#TT-0A</span>
           </div>
        </div>

        {/* Stat Card 3 */}
        <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 hover:border-indigo-500/30' : 'bg-white border-gray-200 hover:border-indigo-200'} backdrop-blur-md rounded-[18px] p-[24px] border relative overflow-hidden group transition-all duration-300`}>
           <div className={`absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl ${darkMode ? 'from-purple-500/10' : 'from-purple-50'} to-transparent rounded-bl-full pointer-events-none group-hover:from-purple-500/20 transition-colors duration-300`}></div>
           <div className={`text-[11px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase mb-[10px] font-['JetBrains_Mono']`}>
             Live Sessions
           </div>
           <div className={`text-[38px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} leading-none mb-[8px] flex items-baseline gap-[10px]`}>
             {stats.activeExams}
           </div>
           <div className={`w-full h-[4px] ${darkMode ? 'bg-[#030206]' : 'bg-gray-100'} rounded-full mt-[16px] overflow-hidden`}>
             <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full w-[42%]"></div>
           </div>
        </div>

         {/* Stat Card 4 */}
         <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 hover:border-indigo-500/30' : 'bg-white border-gray-200 hover:border-indigo-200'} backdrop-blur-md rounded-[18px] p-[24px] border relative overflow-hidden group transition-all duration-300`}>
           <div className={`absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl ${darkMode ? 'from-indigo-600/10' : 'from-indigo-50'} to-transparent rounded-bl-full pointer-events-none group-hover:from-indigo-600/20 transition-colors duration-300`}></div>
           <div className={`text-[11px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase mb-[10px] font-['JetBrains_Mono']`}>
             Avg Pass Rate
           </div>
           <div className={`text-[38px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} leading-none mb-[8px] flex items-baseline gap-[10px]`}>
             76%
           </div>
           <div className={`w-full h-[4px] ${darkMode ? 'bg-[#030206]' : 'bg-gray-100'} rounded-full mt-[16px] overflow-hidden`}>
             <div className="h-full bg-indigo-500 rounded-full w-[76%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
           </div>
        </div>
      </div>

    </>
  );
}
