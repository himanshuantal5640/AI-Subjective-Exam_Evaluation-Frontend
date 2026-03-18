

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailableExams } from "../../services/studentService";

export default function StudentExams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const { data } = await getAvailableExams();
      setExams(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white/70 dark:bg-[#0d1825]/80 backdrop-blur-xl
      p-6 rounded-2xl border dark:border-white/10 shadow-lg">

        <h2 className="text-xl font-semibold mb-6">
          My Exams
        </h2>

        {exams.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No exams taken yet 🚀
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">{exam.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exam.subject} • {exam.totalMarks} Marks
                  </p>
                </div>
                <button
                  onClick={() => !exam.isSubmitted && navigate(`/student/exam/${exam._id}/take`)}
                  disabled={exam.isSubmitted}
                  className={`px-5 py-2 rounded-lg font-medium transition ${
                    exam.isSubmitted 
                      ? "bg-gray-400 cursor-not-allowed text-gray-700" 
                      : "bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer"
                  }`}
                >
                  {exam.isSubmitted ? "Already Taken" : "Start Exam"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}