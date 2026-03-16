import React, { useEffect, useState } from "react";
import { getMyAttendance } from "../../services/studentService";
import toast from "react-hot-toast";

export default function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      const { data } = await getMyAttendance();
      setAttendance(data);
    } catch {
      toast.error("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  const presentCount = attendance.filter(a => a.status === "present").length;
  const percentage = attendance.length > 0 
    ? Math.round((presentCount / attendance.length) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-[#0d1825] p-6 rounded-xl shadow-md border dark:border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Attendance</h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-500">{percentage}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Attendance</div>
        </div>
      </div>

      <div className="space-y-4">
        {attendance.map((record, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border rounded-lg dark:border-white/10 dark:bg-[#111e2f]"
          >
            <div>
              <div className="font-semibold">{record.exam.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{record.exam.subject}</div>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  record.status === "present"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                }`}
              >
                {record.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}

        {attendance.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No attendance records found.
          </div>
        )}
      </div>
    </div>
  );
}
