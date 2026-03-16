import React, { useEffect, useState } from 'react';
import API from '../../services/api';

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await API.get("/admin/users");
        // API.get in this codebase seems to sometimes just use API directly if the adminService isn't imported
        // Let's use the created adminService or standard API since it's already imported
        const allUsers = res.data;
        const teacherUsers = allUsers.filter(u => u.role === 'teacher');
        setTeachers(teacherUsers);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className="text-[28px] md:text-[34px] font-bold font-['Orbitron'] text-white tracking-[1px] leading-tight">
            Teacher Management
          </h1>
          <p className="text-[rgba(220,200,255,0.58)] font-['JetBrains_Mono'] text-[13px] mt-[6px]">
            Manage faculty accounts and access privileges
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#dc50ff] to-[#ff3d6e] hover:shadow-[0_0_20px_rgba(220,80,255,0.4)] text-white px-[24px] py-[12px] rounded-[12px] font-bold font-['JetBrains_Mono'] text-[13px] tracking-[1px] uppercase transition-all duration-300">
          + Add Teacher
        </button>
      </div>

      <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] border border-[#dc50ff]/10 overflow-hidden">
        <div className="flex border-b border-[#dc50ff]/10">
          <button className="flex-1 py-[16px] text-center font-['JetBrains_Mono'] text-[13px] font-bold tracking-[1px] uppercase text-white bg-white/5 border-b-[2px] border-[#dc50ff]">
            All Teachers ({teachers.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20">
                <th className="py-[16px] px-[24px] text-[11px] font-bold tracking-[2px] text-[rgba(180,150,220,0.48)] uppercase font-['JetBrains_Mono']">Teacher</th>
                <th className="py-[16px] px-[24px] text-[11px] font-bold tracking-[2px] text-[rgba(180,150,220,0.48)] uppercase font-['JetBrains_Mono']">Department</th>
                <th className="py-[16px] px-[24px] text-[11px] font-bold tracking-[2px] text-[rgba(180,150,220,0.48)] uppercase font-['JetBrains_Mono']">Activity</th>
                <th className="py-[16px] px-[24px] text-[11px] font-bold tracking-[2px] text-[rgba(180,150,220,0.48)] uppercase font-['JetBrains_Mono'] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher._id} className="border-b border-[#dc50ff]/5 hover:bg-white/5 transition-colors group">
                  <td className="py-[16px] px-[24px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#dc50ff]/20 to-[#38d9ff]/20 flex items-center justify-center border border-[#dc50ff]/30 text-white font-bold font-['Orbitron']">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-[15px]">{teacher.name}</div>
                        <div className="text-[12px] text-[rgba(220,200,255,0.48)]">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[rgba(220,200,255,0.78)]">
                    {teacher.department || 'General'}
                  </td>
                  <td className="py-[16px] px-[24px]">
                    <div className="text-[14px] text-white font-bold flex items-center gap-[6px]">
                      {teacher.generatedExams || 0} <span className="text-[11px] text-[#38d9ff] font-['JetBrains_Mono'] font-normal">Exams</span>
                    </div>
                    <div className="text-[11px] text-[rgba(220,200,255,0.48)] mt-[2px]">{teacher.lastActive || 'N/A'}</div>
                  </td>
                  <td className="py-[16px] px-[24px] text-right">
                    <button className="px-[14px] py-[6px] rounded-[6px] bg-[rgba(220,80,255,0.1)] text-[#dc50ff] border border-[rgba(220,80,255,0.3)] text-[11px] font-bold font-['JetBrains_Mono'] uppercase hover:bg-[#dc50ff] hover:text-white transition-colors mr-[8px]">
                      Edit
                    </button>
                    {teacher.status === 'active' ? (
                      <button className="px-[14px] py-[6px] rounded-[6px] bg-[rgba(255,61,110,0.1)] text-[#ff3d6e] border border-[rgba(255,61,110,0.3)] text-[11px] font-bold font-['JetBrains_Mono'] uppercase hover:bg-[#ff3d6e] hover:text-white transition-colors">
                        Suspend
                      </button>
                    ) : (
                      <button className="px-[14px] py-[6px] rounded-[6px] bg-[rgba(56,217,255,0.1)] text-[#38d9ff] border border-[rgba(56,217,255,0.3)] text-[11px] font-bold font-['JetBrains_Mono'] uppercase hover:bg-[#38d9ff] hover:text-white transition-colors">
                        Activate
                      </button>
                    )}
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
