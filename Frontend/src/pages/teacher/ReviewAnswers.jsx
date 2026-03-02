import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExamSubmissions } from "../../services/teacherService";

export default function ReviewAnswers() {

  const { examId } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getExamSubmissions(examId)
      .then(res => setSubmissions(res.data));
  }, [examId]);

  return (
    <div className="space-y-4">

      {submissions.map(sub => (
        <div key={sub._id}
             className="bg-[#07100a] p-6 rounded-xl border border-green-500/10">
          <p className="text-green-400 font-semibold">
            {sub.student?.name}
          </p>
          <p className="text-gray-400">
            Score: {sub.score}
          </p>
        </div>
      ))}

    </div>
  );
}