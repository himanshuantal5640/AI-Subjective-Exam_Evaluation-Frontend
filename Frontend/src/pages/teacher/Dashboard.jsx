import React from "react";
import { useEffect, useState } from "react";
import { getMyExams } from "../../services/teacherService";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyExams()
      .then(res => setExams(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      {exams.map(exam => (
        <div
          key={exam._id}
          className="bg-[var(--card)] p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-semibold">
            {exam.title}
          </h3>
          <p className="text-sm text-gray-500">
            {exam.subject}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() =>
                navigate(`/teacher/review?examId=${exam._id}`)
              }
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Review
            </button>

            <button
              onClick={() =>
                navigate(`/teacher/analytics?examId=${exam._id}`)
              }
              className="border px-4 py-2 rounded"
            >
              Analytics
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeacherDashboard;