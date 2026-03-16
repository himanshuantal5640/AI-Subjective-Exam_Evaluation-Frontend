import React, { useEffect, useState } from 'react';

export default function AdminExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // API.get("/admin/exams").then(res => setExams(res.data))
    setExams([
      { _id: 'X1', title: 'Midterm Physics', subject: 'Physics 101', teacher: 'Prof. James Webb', status: 'active', submissions: 142 },
      { _id: 'X2', title: 'Final Data Structures', subject: 'CS 301', teacher: 'Dr. Sarah Connor', status: 'completed', submissions: 89 },
      { _id: 'X3', title: 'Operating Systems Quiz 1', subject: 'CS 401', teacher: 'Dr. Sarah Connor', status: 'draft', submissions: 0 },
    ]);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className="text-[28px] md:text-[34px] font-bold font-['Orbitron'] text-white tracking-[1px] leading-tight">
            Comprehensive Exam Logs
          </h1>
          <p className="text-[rgba(220,200,255,0.58)] font-['JetBrains_Mono'] text-[13px] mt-[6px]">
            System-wide visibility of all examination instances
          </p>
        </div>
      </div>

      <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] border border-[#dc50ff]/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/30 border-b border-[#dc50ff]/10">
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono']">Exam Title & Subject</th>
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono'] text-center">Faculty</th>
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono'] text-center">Submissions</th>
                <th className="py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] text-[rgba(180,150,220,0.58)] uppercase font-['JetBrains_Mono'] text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, idx) => (
                <tr key={exam._id} className={`border-b border-[#dc50ff]/5 hover:bg-white/5 transition-colors group ${idx % 2 === 0 ? 'bg-black/10' : ''}`}>
                  <td className="py-[18px] px-[24px]">
                    <div className="font-bold text-white text-[15px] group-hover:text-[#38d9ff] transition-colors">{exam.title}</div>
                    <div className="text-[12px] text-[rgba(220,200,255,0.48)] font-['JetBrains_Mono']">{exam.subject}</div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <div className="inline-block px-[12px] py-[6px] rounded-[8px] bg-white/5 border border-white/5 text-[13px] text-[rgba(220,200,255,0.78)]">
                      {exam.teacher}
                    </div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <span className="font-['Orbitron'] font-bold text-[20px] text-white group-hover:text-purple-400 transition-colors">
                      {exam.submissions}
                    </span>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-right">
                     <span className={`px-[12px] py-[6px] rounded-full text-[10px] font-bold uppercase tracking-widest font-['JetBrains_Mono'] ${
                       exam.status === 'active' ? 'bg-[#38d9ff]/20 text-[#38d9ff] border border-[#38d9ff]/40' :
                       exam.status === 'completed' ? 'bg-green-500/20 text-green-500 border border-green-500/40' :
                       'bg-gray-500/20 text-gray-400 border border-gray-500/40'
                     }`}>
                       {exam.status}
                     </span>
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
