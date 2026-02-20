import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAnswersByExam,
  overrideAnswer,
  getAuditLogs,
} from "../../services/reviewService";

const Review = () => {
  const [params] = useSearchParams();
  const examId = params.get("examId");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [comment, setComment] = useState("");

  const [answers, setAnswers] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);

  useEffect(() => {
    if (examId) {
      getAnswersByExam(examId)
        .then((res) => setAnswers(res.data))
        .catch((err) => console.error(err));
    }
  }, [examId]);

  const handleOverride = async (answerId) => {
    const newScore = prompt("Enter new score:");
    const comment = prompt("Enter comment:");

    await overrideAnswer(answerId, {
      teacherFinalScore: newScore,
      teacherComment: comment,
    });

    alert("Score updated");
  };

  const handleViewLogs = async (answerId) => {
    const res = await getAuditLogs(answerId);
    setSelectedLogs(res.data);
  };

  return (
    <div className="space-y-6">
      {answers.map((answer) => (
        <div
          key={answer._id}
          className="bg-[var(--card)] p-6 rounded-xl shadow"
        >
          <p className="font-medium">Student: {answer.studentId?.name}</p>

          <p className="mt-2">AI Score: {answer.aiFinalScore}</p>

          <p>Teacher Final: {answer.teacherFinalScore}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setSelectedAnswer(answer)}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Override
            </button>

            <button
              onClick={() => handleViewLogs(answer._id)}
              className="border px-4 py-2 rounded"
            >
              View Logs
            </button>
          </div>
        </div>
      ))}

      {selectedLogs.length > 0 && (
        <div className="bg-[var(--card)] p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Audit Logs</h3>

          {selectedLogs.map((log) => (
            <div key={log._id} className="mb-2 text-sm">
              <p>
                Changed from {log.previousTeacherScore}→ {log.newTeacherScore}
              </p>
              <p>Comment: {log.teacherComment}</p>
            </div>
          ))}
        </div>
      )}
      {selectedAnswer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-[var(--card)] p-6 rounded-xl w-full max-w-md">
            <h3 className="font-semibold mb-4">Override Score</h3>

            <input
              type="number"
              placeholder="New Score"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />

            <textarea
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedAnswer(null)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await overrideAnswer(selectedAnswer._id, {
                    teacherFinalScore: newScore,
                    teacherComment: comment,
                  });

                  setSelectedAnswer(null);
                  alert("Updated");
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
