import React, { useEffect, useState } from 'react';
import API from '../../services/api';

export default function AdminDashboard() {
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
          <h1 className="text-[28px] md:text-[34px] font-bold font-['Orbitron'] text-white tracking-[1px] leading-tight flex items-center gap-[14px]">
            System Overview 
            <span className="inline-block w-[10px] h-[10px] bg-[#38d9ff] rounded-full shadow-[0_0_12px_#38d9ff] animate-pulse"></span>
          </h1>
          <p className="text-[rgba(220,200,255,0.58)] font-['JetBrains_Mono'] text-[13px] mt-[6px]">
            Live monitoring • Node Beta-7 • <span className="text-[#38d9ff]">Active</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[22px] mb-[32px]">
        {/* Stat Card 1 */}
        <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] p-[24px] border border-[#dc50ff]/10 relative overflow-hidden group hover:border-[#dc50ff]/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-[#dc50ff]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#dc50ff]/20 transition-colors duration-300"></div>
          <div className="text-[11px] font-bold tracking-[2px] text-[rgba(180,150,220,0.48)] uppercase mb-[10px] font-['JetBrains_Mono']">
            Total Users
          </div>
          <div className="text-[38px] font-bold font-['Orbitron'] text-white leading-none mb-[8px] flex items-baseline gap-[10px]">
             {stats.totalUsers}
            <span className="text-[12px] font-['JetBrains_Mono'] text-[#38d9ff] px-[6px] py-[3px] rounded-[6px] bg-[#38d9ff]/10 border border-[#38d9ff]/20">
              <span className="mr-[2px]">↑</span> 12%
            </span>
          </div>
          <div className="text-[13px] text-[rgba(220,200,255,0.48)] flex justify-between items-center mt-[15px]">
            <span>Active network</span>
            <span className="text-[#ffb830] font-['Orbitron'] opacity-50">#U-102</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] p-[24px] border border-[#dc50ff]/10 relative overflow-hidden group hover:border-[#dc50ff]/30 transition-all duration-300">
           <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-[#38d9ff]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#38d9ff]/20 transition-colors duration-300"></div>
           <div className="text-[11px] font-bold tracking-[2px] text-[rgba(180,150,220,0.48)] uppercase mb-[10px] font-['JetBrains_Mono']">
             Total Exams
           </div>
           <div className="text-[38px] font-bold font-['Orbitron'] text-white leading-none mb-[8px] flex items-baseline gap-[10px]">
             {stats.totalExams}
             <span className="text-[12px] font-['JetBrains_Mono'] text-[#38d9ff] px-[6px] py-[3px] rounded-[6px] bg-[#38d9ff]/10 border border-[#38d9ff]/20">
               <span className="mr-[2px]">↑</span> 8%
             </span>
           </div>
           <div className="text-[13px] text-[rgba(220,200,255,0.48)] flex justify-between items-center mt-[15px]">
             <span>Registered tests</span>
             <span className="text-[#38d9ff] font-['Orbitron'] opacity-50">#TT-0A</span>
           </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] p-[24px] border border-[#dc50ff]/10 relative overflow-hidden group hover:border-[#dc50ff]/30 transition-all duration-300">
           <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-[#ffb830]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#ffb830]/20 transition-colors duration-300"></div>
           <div className="text-[11px] font-bold tracking-[2px] text-[rgba(180,150,220,0.48)] uppercase mb-[10px] font-['JetBrains_Mono']">
             Active Sessions
           </div>
           <div className="text-[38px] font-bold font-['Orbitron'] text-white leading-none mb-[8px] flex items-baseline gap-[10px]">
             {stats.activeExams}
           </div>
           <div className="w-full h-[4px] bg-[#030206] rounded-full mt-[16px] overflow-hidden">
             <div className="h-full bg-gradient-to-r from-[#ffb830] to-[#ff3d6e] rounded-full w-[42%]"></div>
           </div>
        </div>

         {/* Stat Card 4 */}
         <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] p-[24px] border border-[#dc50ff]/10 relative overflow-hidden group hover:border-[#dc50ff]/30 transition-all duration-300">
           <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-[#ff3d6e]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#ff3d6e]/20 transition-colors duration-300"></div>
           <div className="text-[11px] font-bold tracking-[2px] text-[rgba(180,150,220,0.48)] uppercase mb-[10px] font-['JetBrains_Mono']">
             Avg Pass Rate
           </div>
           <div className="text-[38px] font-bold font-['Orbitron'] text-white leading-none mb-[8px] flex items-baseline gap-[10px]">
             76%
           </div>
           <div className="w-full h-[4px] bg-[#030206] rounded-full mt-[16px] overflow-hidden">
             <div className="h-full bg-gradient-to-r from-[#dc50ff] to-[#38d9ff] rounded-full w-[76%]"></div>
           </div>
        </div>
      </div>
    </>
  );
}
