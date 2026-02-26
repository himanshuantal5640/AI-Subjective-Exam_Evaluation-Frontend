

import React, { useEffect, useState } from "react";
import API from "../../services/api";

export default function StudentExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const { data } = await API.get("/answers/my-results");
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
  exams.map((exam) => (
    <div
      key={exam._id}
      className="flex justify-between py-3 border-b dark:border-white/10"
    >
      <span>{exam.examId}</span>
      <span className="font-semibold text-cyan-500">
        {exam.score}
      </span>
    </div>
  ))
)}
      </div>
    </div>
  );
}