import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyExams, toggleExamStatus } from "../../services/teacherService";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { Edit, Trash, Eye, Users, CheckCircle, Clock, Plus, BarChart2 } from "lucide-react";

export default function ManageExams() {
  const { darkMode } = useTheme();
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const fetchExams = () => {
    getMyExams().then(res => setExams(res.data)).catch(() => toast.error("Failed to fetch exams"));
  }

  useEffect(() => {
    fetchExams();
  }, []);

  const handleToggleStatus = async (examId) => {
    try {
      await toggleExamStatus(examId);
      toast.success("Exam status updated!");
      fetchExams();
    } catch (err) {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-gray-900'}`}>Manage Examinations</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Monitor, update, and review all your exam instances.</p>
        </div>
        <button 
          onClick={() => navigate('/teacher/create')}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-500/20 hover:scale-105 transition-all active:scale-95"
        >
          <Plus size={18} /> Create New Exam
        </button>
      </div>

      <div className={`${darkMode ? 'bg-[#07100a] border-green-500/10' : 'bg-white border-gray-200 shadow-sm'} rounded-2xl border overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`${darkMode ? 'bg-[#0b1610] text-green-400 border-green-500/10' : 'bg-gray-50 text-gray-700 border-gray-100'} border-b`}>
                <th className="p-5 text-left font-semibold text-sm uppercase tracking-wider">Exam Details</th>
                <th className="p-5 text-left font-semibold text-sm uppercase tracking-wider text-center">Status</th>
                <th className="p-5 text-left font-semibold text-sm uppercase tracking-wider text-center">Total Marks</th>
                <th className="p-5 text-right font-semibold text-sm uppercase tracking-wider">Management Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-green-500/10">
              {exams.map(exam => (
                <tr key={exam._id} className={`${darkMode ? 'text-gray-300 hover:bg-green-500/5' : 'text-gray-700 hover:bg-gray-50'} transition`}>
                  <td className="p-5">
                    <div className="font-bold text-lg">{exam.title}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-0.5`}>Subject: {exam.subject || 'General'}</div>
                  </td>
                  <td className="p-5 text-center">
                    <button
                      onClick={() => handleToggleStatus(exam._id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        exam.status === "active"
                          ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/20 hover:bg-gray-500/20"
                      }`}
                    >
                      {exam.status === "active" ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {exam.status.toUpperCase()}
                    </button>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`px-3 py-1 rounded-[8px] border ${
                      darkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    } font-mono font-bold`}>
                      {exam.totalMarks}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-end gap-2">
                      <button
                        title="Review Submissions"
                        onClick={() => navigate(`/teacher/review/${exam._id}`)}
                        className={`p-2.5 rounded-xl transition ${
                          darkMode ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500 text-white' : 'bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white'
                        }`}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        title="Analytics"
                        onClick={() => navigate(`/teacher/analytics/${exam._id}`)}
                        className={`p-2.5 rounded-xl transition ${
                          darkMode ? 'bg-orange-500/10 text-orange-400 hover:bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white'
                        }`}
                      >
                        <BarChart2 size={18} />
                      </button>
                      <button
                        title="Attendance"
                        onClick={() => navigate(`/teacher/attendance/${exam._id}`)}
                        className={`p-2.5 rounded-xl transition ${
                          darkMode ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        <Users size={18} />
                      </button>
                      <button
                        title="Manage Questions"
                        onClick={() => navigate(`/teacher/exam/${exam._id}/questions`)}
                        className={`p-2.5 rounded-xl transition ${
                          darkMode ? 'bg-green-500/10 text-green-400 hover:bg-green-500 text-white' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'
                        }`}
                      >
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {exams.length === 0 && (
            <div className={`p-20 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <div className="mb-4 flex justify-center opacity-20"><Plus size={48} /></div>
              <p className="font-medium">No examinations created yet.</p>
              <button 
                onClick={() => navigate('/teacher/create')}
                className="mt-4 text-green-500 hover:underline text-sm font-bold"
              >
                Create your first exam now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}