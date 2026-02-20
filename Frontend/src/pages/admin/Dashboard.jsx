import React from "react";
import { useEffect, useState } from "react";
import { getSystemAnalytics } from "../../services/adminService";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSystemAnalytics()
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-[var(--card)] p-6 rounded-xl shadow">
        <h3>Total Users</h3>
        <p className="text-3xl font-bold">{data.totalUsers}</p>
      </div>

      <div className="bg-[var(--card)] p-6 rounded-xl shadow">
        <h3>Total Exams</h3>
        <p className="text-3xl font-bold">{data.totalExams}</p>
      </div>

      <div className="bg-[var(--card)] p-6 rounded-xl shadow">
        <h3>Total Submissions</h3>
        <p className="text-3xl font-bold">{data.totalAnswers}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;