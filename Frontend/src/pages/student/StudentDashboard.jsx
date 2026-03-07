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

      const totalExams = data.length;
      let totalScore = 0;
      let passedExams = 0;

      data.forEach(r => {
        const score = r.aiFinalScore || r.teacherFinalScore || r.score || 0;
        totalScore += score;
        if (score >= 40) passedExams++; // Assuming 40 is pass mark
      });

      setStats({
        score: totalExams > 0 ? Math.round(totalScore / totalExams) : 0,
        exams: totalExams,
        passRate: totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0,
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