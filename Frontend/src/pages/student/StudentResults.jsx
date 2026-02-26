import React, { useEffect, useState } from "react";
import { getMyResults } from "../../services/answerService";
import toast from "react-hot-toast";

export default function StudentResults() {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const { data } = await getMyResults();
      setResults(data);
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

      {results.length === 0 ? (
  <div className="text-center py-10 text-gray-500 dark:text-gray-400">
    No results available yet 📊
  </div>
) : (
  results.map((r) => (
    <div
      key={r._id}
      className="flex justify-between py-3 border-b dark:border-white/10"
    >
      <span>{r.examId}</span>
      <span className="font-semibold text-purple-500">
        {r.score}
      </span>
    </div>
  ))
)}
    </div>
  );
}