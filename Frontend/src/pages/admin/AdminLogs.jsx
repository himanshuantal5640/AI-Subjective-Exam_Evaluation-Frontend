import React from 'react';

export default function AdminLogs() {
  const logs = [
    { id: '1', event: 'SYSTEM_STARTUP', user: 'SYSTEM', time: '10:00:00 AM', status: 'SUCCESS' },
    { id: '2', event: 'USER_LOGIN', user: 'admin@nexuseval.edu', time: '10:15:32 AM', status: 'SUCCESS' },
    { id: '3', event: 'EXAM_CREATED', user: 'sarah@nexuseval.edu', time: '11:05:12 AM', status: 'SUCCESS' },
    { id: '4', event: 'INVALID_LOGIN_ATTEMPT', user: 'unknown', time: '12:00:05 PM', status: 'WARNING' },
    { id: '5', event: 'DB_CONNECTION_LOST', user: 'SYSTEM', time: '01:23:45 PM', status: 'ERROR' },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className="text-[28px] md:text-[34px] font-bold font-['Orbitron'] text-white tracking-[1px] leading-tight">
            Audit Logs
          </h1>
          <p className="text-[rgba(220,200,255,0.58)] font-['JetBrains_Mono'] text-[13px] mt-[6px]">
            System events and security tracking
          </p>
        </div>
      </div>

      <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] border border-[#dc50ff]/10 p-6 font-['JetBrains_Mono'] text-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#dc50ff]/20 text-[#38d9ff]">
              <th className="py-2 pr-4">Timestamp</th>
              <th className="py-2 px-4">Level</th>
              <th className="py-2 px-4">Event</th>
              <th className="py-2 px-4">Actor</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                <td className="py-3 pr-4 text-gray-400 whitespace-nowrap">{log.time}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    log.status === 'ERROR' ? 'bg-red-500/20 text-red-500' :
                    log.status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-green-500/20 text-green-500'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-300">{log.event}</td>
                <td className="py-3 px-4 text-gray-500">{log.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
