import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get("/exams/available")
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
          <h3 className="font-semibold text-lg">
            {exam.title}
          </h3>
          <p className="text-sm text-gray-500">
            Subject: {exam.subject}
          </p>

          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
            Take Exam
          </button>
          <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:opacity-90">
  Start Exam
</button>
        </div>
      ))}
    </div>
  );
};

export default Exams;