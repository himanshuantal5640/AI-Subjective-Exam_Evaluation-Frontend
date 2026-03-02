import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TeacherDashboard() {

  const [stats, setStats] = useState({
    totalExams: 0,
    activeExams: 0,
    completedExams: 0,
    totalStudents: 0,
  });

  
  const loadData = async () => {
    try {
      const examRes = await api.get("/exams/my-exams");
      const studentRes = await api.get("/users/students");
      
      const exams = examRes.data;
      
      setStats({
        totalExams: exams.length,
        activeExams: exams.filter(e => e.status === "active").length,
        completedExams: exams.filter(e => e.status === "completed").length,
        totalStudents: studentRes.data.length,
      });
      
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  
  const Card = ({ title, value, color }) => (
    <div
      className={`
      rounded-2xl p-6 shadow-md transition-all
      bg-white dark:bg-[#071a10]
      border border-gray-200 dark:border-green-500/20
      hover:shadow-xl
      `}
    >
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );

  return (
    <div className="space-y-8">
       {/* Extra Section (Optional Visual Block) */}
      <div className="
      bg-gradient-to-r from-green-500 to-emerald-600
      rounded-2xl p-8 text-white shadow-lg">

        <h2 className="text-xl font-semibold">
          Welcome Back 👋
        </h2>

        <p className="text-sm opacity-90 mt-2">
          Manage your exams, review submissions, and track analytics
          all in one place.
        </p>

      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-green-400">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Monitor your exams and student performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <Card
          title="Total Exams"
          value={stats.totalExams}
          color="text-green-600 dark:text-green-400"
        />

        <Card
          title="Active Exams"
          value={stats.activeExams}
          color="text-blue-600 dark:text-blue-400"
        />

        <Card
          title="Completed Exams"
          value={stats.completedExams}
          color="text-purple-600 dark:text-purple-400"
        />

        <Card
          title="Total Students"
          value={stats.totalStudents}
          color="text-emerald-600 dark:text-emerald-400"
        />

      </div>

     

    </div>
  );
}