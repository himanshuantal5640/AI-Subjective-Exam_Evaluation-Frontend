import React from "react";
import { useEffect, useState } from "react";
import { getStudentAnalytics } from "../../services/analyticsService";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getStudentAnalytics()
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data)
    return <div className="p-10">Loading analytics...</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-[var(--card)] p-6 rounded-xl shadow">
        <h3>Total Attempts</h3>
        <p className="text-3xl font-bold">
          {data.totalAttempts}
        </p>
      </div>

      <div className="bg-[var(--card)] p-6 rounded-xl shadow">
        <h3>Average Score</h3>
        <p className="text-3xl font-bold">
          {data.averageScore}
        </p>
      </div>

      <div className="bg-[var(--card)] p-6 rounded-xl shadow">
        <h3>Weak Concepts</h3>
        <p className="text-3xl font-bold">
          {data.weakConcepts.length}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;