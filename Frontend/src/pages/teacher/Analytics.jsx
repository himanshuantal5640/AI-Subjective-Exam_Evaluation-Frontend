import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#ef4444"];

const Analytics = () => {
  const [params] = useSearchParams();
  const examId = params.get("examId");

  const [data, setData] = useState(null);

  useEffect(() => {
    if (examId) {
      api.get(`/analytics/teacher/${examId}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }
  }, [examId]);

  if (!data) return <div>Loading...</div>;

  const difficultyData = Object.entries(data.difficultyIndex || {}).map(
    ([qId, difficulty]) => ({
      name: difficulty,
      value: 1,
    })
  );

  return (
    <div className="space-y-8">

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--card)] p-6 rounded-xl shadow">
          <h3>Total Students</h3>
          <p className="text-3xl font-bold">{data.totalStudents}</p>
        </div>

        <div className="bg-[var(--card)] p-6 rounded-xl shadow">
          <h3>Class Average</h3>
          <p className="text-3xl font-bold">{data.classAverage}</p>
        </div>
      </div>

      {/* Difficulty Pie Chart */}
      <div className="bg-[var(--card)] p-6 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">
          Question Difficulty
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={difficultyData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {difficultyData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Most Missed Concepts */}
      <div className="bg-[var(--card)] p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">
          Most Missed Concepts
        </h3>

        <ul className="list-disc ml-6">
          {data.mostMissedConcepts.map(c => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Analytics;