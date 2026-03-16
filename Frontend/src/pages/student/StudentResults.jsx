import React, { useEffect, useState } from "react";
import { getMyResults } from "../../services/answerService";
import toast from "react-hot-toast";

export default function StudentResults() {
  const [examResults, setExamResults] = useState([]);

  const fetchResults = async () => {
    try {
      const { data } = await getMyResults();
      
      const grouped = {};
      data.forEach(r => {
        const examId = r.examId?._id || r.examId || "unknown";
        const examTitle = r.examId?.title || "Unknown Exam";
        
        if (!grouped[examId]) {
          grouped[examId] = {
            examId,
            examTitle,
            totalScore: 0,
            questionCount: 0
          };
        }
        
        const score = r.hybridFinalScore || r.teacherFinalScore || r.aiFinalScore || r.score || 0;
        grouped[examId].totalScore += score;
        grouped[examId].questionCount += 1;
      });

      setExamResults(Object.values(grouped));
    } catch {
      toast.error("Failed to load results");
    }
  };
  
  useEffect(() => {
    fetchResults();
  }, []);


  return (
    <div className="bg-white dark:bg-[#0d1825] p-6 rounded-xl shadow-md border dark:border-white/10">
      <h2 className="text-xl font-semibold mb-6">My Results</h2>

      {examResults.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No results available yet 📊
        </div>
      ) : (
        examResults.map((r, i) => (
          <div
            key={i}
            className="flex justify-between py-4 border-b dark:border-white/10 items-center"
          >
            <div>
              <div className="font-semibold text-lg">{r.examTitle}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{r.questionCount} Questions Answered</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-2xl text-purple-500">
                {r.totalScore}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Score</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}