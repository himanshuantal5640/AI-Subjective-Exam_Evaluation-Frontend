import React, { useEffect, useState } from "react";
import StatCard from "../../components/student/StatCard";
import API from "../../services/api";

export default function StudentDashboard() {
  const [stats, setStats] = useState({
    score: 0,
    exams: 0,
    passRate: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data } = await API.get("/answers/my-results");

      const totalResults = data.length;
      let totalPercentage = 0;
      let passedExams = 0;

      data.forEach(r => {
        const score = r.aiFinalScore || r.teacherFinalScore || r.score || 0;
        const totalMarks = r.questionId?.totalMarks || r.examId?.totalMarks || 100;

        // Calculate percentage for this exam
        const percentage = (score / totalMarks) * 100;
        totalPercentage += percentage;

        if (percentage >= 40) passedExams++; // Assuming 40% is pass mark
      });

      setStats({
        score: totalResults > 0 ? Math.round(totalPercentage / totalResults) : 0,
        exams: totalResults,
        passRate: totalResults > 0 ? Math.round((passedExams / totalResults) * 100) : 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard title="Overall Score" value={`${stats.score}%`} />
      <StatCard title="Exams Taken" value={stats.exams} />
      <StatCard title="Pass Rate" value={`${stats.passRate}%`} />
    </div>
  );
}