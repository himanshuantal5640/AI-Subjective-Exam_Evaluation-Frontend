import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyExams } from "../../services/teacherService";

export default function ManageExams() {

  const [exams, setExams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMyExams().then(res => setExams(res.data));
  }, []);

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
              <td>{exam.status}</td>
              <td>{exam.totalMarks}</td>
              <td className="py-4 pr-4 text-right">
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