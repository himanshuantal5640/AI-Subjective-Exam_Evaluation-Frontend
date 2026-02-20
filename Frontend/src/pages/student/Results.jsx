import React from "react";
import { useEffect, useState } from "react";
import { getMyResults } from "../../services/answerService";

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getMyResults()
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      {results.map(answer => (
        <div
          key={answer._id}
          className="bg-[var(--card)] p-6 rounded-xl shadow"
        >
          <h3 className="font-semibold mb-2">
            Question ID: {answer.questionId}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <p>Rule Score: {answer.aiFinalScore}</p>
            <p>AI Score: {answer.aiSemanticScore}</p>
            <p>Hybrid: {answer.hybridFinalScore}</p>
            <p>
              Teacher Final: {answer.teacherFinalScore}
            </p>
          </div>

          <div className="mt-4">
            <span className="px-3 py-1 rounded bg-indigo-600 text-white">
              Confidence: {answer.aiConfidence}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;