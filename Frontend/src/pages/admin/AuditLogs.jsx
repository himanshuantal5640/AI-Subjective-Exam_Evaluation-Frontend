import React from "react";
import { useEffect, useState } from "react";
import { getAuditLogs } from "../../services/adminService";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAuditLogs().then(res => setLogs(res.data));
  }, []);

  return (
    <div className="bg-[var(--card)] p-6 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">Audit Logs</h3>

      {logs.map(log => (
        <div key={log._id} className="border-b py-3">
          <p>
            Teacher: {log.teacherId?.name}
          </p>
          <p>
            {log.previousTeacherScore} → {log.newTeacherScore}
          </p>
          <p className="text-sm text-gray-500">
            {log.teacherComment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AuditLogs;