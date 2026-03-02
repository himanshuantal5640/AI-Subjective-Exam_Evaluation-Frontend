import React from "react";
import { useEffect, useState } from "react";
import { getMyExams } from "../../services/teacherService";

export default function ManageExams() {

  const [exams, setExams] = useState([]);

  useEffect(() => {
    getMyExams().then(res => setExams(res.data));
  }, []);

  return (
    <div className="bg-[#07100a] rounded-xl border border-green-500/10 overflow-hidden">

      <table className="w-full">

        <thead className="bg-[#0b1610] text-green-400">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th>Status</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {exams.map(exam => (
            <tr key={exam._id} className="border-t border-green-500/10">
              <td className="p-4">{exam.title}</td>
              <td>{exam.status}</td>
              <td>{exam.totalMarks}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}