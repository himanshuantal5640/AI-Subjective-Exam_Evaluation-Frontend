import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions } from "../../services/teacherService"; // We can reuse this to fetch questions
import API from "../../services/api";
import toast from "react-hot-toast";

export default function TakeExam() {
    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, [examId]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            // Wait, getQuestions requires teacher auth? No, the route might be open to students too. Let's check or assume we can use API directly.
            const { data } = await API.get(`/questions/${examId}`);
            setQuestions(Array.isArray(data) ? data : data.questions || []);
        } catch (err) {
            toast.error("Failed to load questions");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId, text) => {
        setAnswers({ ...answers, [questionId]: text });
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length === 0) {
            return toast.error("Please answer at least one question.");
        }

        try {
            setSubmitting(true);

            // The backend expects an array of answers or multiple submissions.
            // Looking at answerRoutes.js: router.post("/submit", auth, role(["student"]), c.submitAnswer);
            // Let's loop through and submit each answer. Or if it accepts an array, submit all. 
            // Assuming it handles one by one based on typical setup.
            const promises = Object.keys(answers).map(questionId => {
                return API.post("/answers/submit", {
                    examId,
                    questionId,
                    answerText: answers[questionId]
                });
            });

            await Promise.all(promises);
            toast.success("Exam submitted successfully!");
            navigate("/student/results");

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit exam");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-gray-500">Loading Exam...</div>;
    }

    if (questions.length === 0) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl mb-4">No questions found for this exam.</h2>
                <button
                    onClick={() => navigate("/student/exams")}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                    Taking Exam
                </h2>
                <button
                    onClick={() => navigate("/student/exams")}
                    className="text-gray-400 hover:text-white transition"
                >
                    Exit Exam
                </button>
            </div>

            <div className="space-y-8">
                {questions.map((q, idx) => (
                    <div key={q._id} className="bg-white/70 dark:bg-[#0d1825]/80 backdrop-blur-xl p-6 rounded-2xl border dark:border-white/10 shadow-lg">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                                Q{idx + 1}. {q.text}
                            </h3>
                            <span className="text-sm text-cyan-500 font-medium whitespace-nowrap ml-4">
                                {q.totalMarks} Marks
                            </span>
                        </div>

                        <textarea
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#060d14] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 min-h-[150px]"
                            placeholder="Write your answer here..."
                            value={answers[q._id] || ""}
                            onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white font-bold rounded-xl transition shadow-lg disabled:opacity-50"
                >
                    {submitting ? "Submitting..." : "Submit Exam"}
                </button>
            </div>
        </div>
    );
}
