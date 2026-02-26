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

      setStats({
        score: 87,
        exams: data.length,
        passRate: 91,
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