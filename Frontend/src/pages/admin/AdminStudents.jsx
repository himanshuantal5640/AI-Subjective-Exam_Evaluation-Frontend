import React, { useEffect, useState } from 'react';
import API from '../../services/api';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get("/admin/users");
        const allUsers = res.data;
        const studentUsers = allUsers.filter(u => u.role === 'student');
        setStudents(studentUsers);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className="text-[28px] md:text-[34px] font-bold font-['Orbitron'] text-white tracking-[1px] leading-tight flex items-center gap-[14px]">
            Student Records
            <span className="text-[12px] font-['JetBrains_Mono'] px-[8px] py-[4px] rounded-[6px] bg-[#ffb830]/10 text-[#ffb830] border border-[#ffb830]/20 align-middle">
              {students.length} Total
            </span>
          </h1>
          <p className="text-[rgba(220,200,255,0.58)] font-['JetBrains_Mono'] text-[13px] mt-[6px]">
            Overview of all student accounts and academic metrics
          </p>
        </div>
        
        <div className="flex gap-[12px]">
          <div className="relative">
             <input type="text" placeholder="Search student..." className="w-[240px] bg-[#08060f]/80 backdrop-blur border border-[#dc50ff]/20 rounded-[10px] py-[10px] pl-[38px] pr-[16px] text-[13px] text-white font-['JetBrains_Mono'] focus:outline-none focus:border-[#dc50ff]/60 transition-colors placeholder-[rgba(220,200,255,0.3)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" />
             <span className="absolute left-[14px] top-[10px] text-[14px] opacity-40">🔍</span>
          </div>
          <button className="bg-[rgba(220,80,255,0.1)] border border-[#dc50ff]/30 hover:bg-[#dc50ff] hover:text-white text-[#dc50ff] px-[18px] py-[10px] rounded-[10px] font-bold font-['JetBrains_Mono'] text-[12px] tracking-[1px] uppercase transition-all duration-300">
            Export
          </button>
        </div>
      </div>

      <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] border border-[#dc50ff]/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-[#ffb830]/5 to-transparent pointer-events-none rounded-bl-full"></div>
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/30 border-b border-[#dc50ff]/10">
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono']">Student Details</th>
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono'] text-center">Program</th>
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono'] text-center">Exams</th>
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono'] text-center">Avg Score</th>
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono'] text-right">Settings</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student._id} className={`border-b border-[#dc50ff]/5 hover:bg-white/5 transition-colors group ${idx % 2 === 0 ? 'bg-black/10' : ''}`}>
                  <td className="py-[18px] px-[24px]">
                    <div className="flex items-center gap-[14px]">
                      <div className="relative">
                        <div className="w-[44px] h-[44px] rounded-[12px] bg-[#110e1c] border border-[rgba(220,80,255,0.2)] flex items-center justify-center overflow-hidden group-hover:border-[#dc50ff]/50 transition-colors">
                          <span className="font-['Orbitron'] font-bold text-[18px] text-transparent bg-clip-text bg-gradient-to-br from-[#ffb830] to-[#ff3d6e]">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        {student.status === 'active' && (
                          <div className="absolute -top-[3px] -right-[3px] w-[12px] h-[12px] bg-[#38d9ff] rounded-full border-[2px] border-[#08060f] shadow-[0_0_8px_#38d9ff]"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white text-[15px] group-hover:text-[#ffb830] transition-colors">{student.name}</div>
                        <div className="text-[12px] text-[rgba(220,200,255,0.48)] font-['JetBrains_Mono']">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <div className="inline-block px-[12px] py-[6px] rounded-[8px] bg-white/5 border border-white/5 text-[13px] text-[rgba(220,200,255,0.78)]">
                      {student.course || 'Undeclared'}
                      <span className="block text-[10px] text-[rgba(220,200,255,0.38)] mt-[2px] uppercase font-['JetBrains_Mono'] tracking-[1px]">{student.year || 'N/A'}</span>
                    </div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <span className="font-['Orbitron'] font-bold text-[20px] text-white">{student.examsTaken || 0}</span>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <div className="flex flex-col items-center">
                      <span className={`font-['Orbitron'] font-bold text-[20px] ${
                        (student.avgScore || 0) >= 85 ? 'text-[#38d9ff]' : (student.avgScore || 0) >= 70 ? 'text-[#ffb830]' : 'text-[#ff3d6e]'
                      }`}>
                        {student.avgScore || 0}%
                      </span>
                      <div className="w-[40px] h-[3px] bg-black/50 rounded-full mt-[6px] overflow-hidden">
                        <div className={`h-full rounded-full ${
                          (student.avgScore || 0) >= 85 ? 'bg-[#38d9ff]' : (student.avgScore || 0) >= 70 ? 'bg-[#ffb830]' : 'bg-[#ff3d6e]'
                        }`} style={{ width: `${student.avgScore || 0}%` }}></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-right">
                     <button className="text-[rgba(220,200,255,0.48)] hover:text-white p-[8px] rounded-[8px] hover:bg-white/10 transition-colors">
                        ⚙️
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
