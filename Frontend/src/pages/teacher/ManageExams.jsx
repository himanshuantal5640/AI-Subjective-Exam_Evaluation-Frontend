import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyExams, toggleExamStatus } from "../../services/teacherService";
import toast from "react-hot-toast";

export default function ManageExams() {

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
    <div className="bg-[#07100a] rounded-xl border border-green-500/10 overflow-hidden">

      <table className="w-full">

        <thead className="bg-[#0b1610] text-green-400">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="text-left">Status</th>
            <th className="text-left">Marks</th>
            <th className="text-left py-4 pr-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {exams.map(exam => (
            <tr key={exam._id} className="border-t border-green-500/10 text-gray-300 hover:bg-green-500/5 transition">
              <td className="p-4">{exam.title}</td>
              <td>
                <button
                  onClick={() => handleToggleStatus(exam._id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${exam.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                    }`}
                >
                  {exam.status.toUpperCase()}
                </button>
              </td>
              <td>{exam.totalMarks}</td>
              <td className="py-4 pr-4 text-right space-x-2">
                <button
                  type="button"
                  onClick={() => navigate(`/teacher/review/${exam._id}`)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm transition"
                >
                  Review Submissions
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/teacher/attendance/${exam._id}`)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition"
                >
                  Attendance
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/teacher/exam/${exam._id}/questions`)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm transition"
                >
                  Add / View Questions
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}