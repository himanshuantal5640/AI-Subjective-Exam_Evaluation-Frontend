import React, { useEffect, useState } from "react";
import StatCard from "../../components/student/StatCard";
import API from "../../services/api";
import { getMyAttendance } from "../../services/studentService";

export default function StudentDashboard() {
  const [stats, setStats] = useState({
    score: 0,
    exams: 0,
    passRate: 0,
    attendanceRate: 0,
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

      // Fetch Attendance
      let attendancePercentage = 0;
      try {
        const attRes = await getMyAttendance();
        const totalExams = attRes.data.length;
        if (totalExams > 0) {
          const presentCount = attRes.data.filter(a => a.status === "present").length;
          attendancePercentage = Math.round((presentCount / totalExams) * 100);
        }
      } catch (e) {
        console.error("Failed to load attendance", e);
      }

      setStats({
        score: totalResults > 0 ? Math.round(totalPercentage / totalResults) : 0,
        exams: totalResults,
        passRate: totalResults > 0 ? Math.round((passedExams / totalResults) * 100) : 0,
        attendanceRate: attendancePercentage
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Overall Score" value={`${stats.score}%`} />
      <StatCard title="Exams Taken" value={stats.exams} />
      <StatCard title="Pass Rate" value={`${stats.passRate}%`} />
      <StatCard title="Attendance" value={`${stats.attendanceRate}%`} />
    </div>
  );
}