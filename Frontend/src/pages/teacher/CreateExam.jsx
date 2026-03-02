import React from "react";
// import { useState } from "react";
// import { createExam } from "../../services/teacherService";
// import toast from "react-hot-toast";

// export default function CreateExam() {

//   const [form, setForm] = useState({
//     title: "",
//     duration: "",
//     totalMarks: ""
//   });

//   const handleSubmit = async () => {
//     try {
//       await createExam(form);
//       toast.success("Exam Created!");
//     } catch {
//       toast.error("Failed");
//     }
//   };

//   return (
//     <div className="max-w-xl bg-[#07100a] p-8 rounded-xl border border-green-500/10">

//       <h2 className="text-xl font-bold text-green-400 mb-6">
//         Create Exam
//       </h2>

//       <div className="space-y-4">

//         <input
//           placeholder="Exam Title"
//           className="input"
//           onChange={(e)=>setForm({...form,title:e.target.value})}
//         />

//         <input
//           placeholder="Duration (minutes)"
//           className="input"
//           onChange={(e)=>setForm({...form,duration:e.target.value})}
//         />

//         <input
//           placeholder="Total Marks"
//           className="input"
//           onChange={(e)=>setForm({...form,totalMarks:e.target.value})}
//         />

//         <button
//           onClick={handleSubmit}
//           className="btn-primary w-full"
//         >
//           Create
//         </button>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { createExam } from "../../services/teacherService";
import toast from "react-hot-toast";

export default function CreateExam() {

  const [form, setForm] = useState({
    title: "",
    subject: "",
    duration: "",
    totalMarks: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {

    if (!form.title || !form.subject) {
      return toast.error("Title and Subject required");
    }

    try {
      await createExam(form);
      toast.success("Exam Created");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-white dark:bg-[#062015]
        border border-gray-300 dark:border-green-500/20"
      />

      <input
        name="subject"
        placeholder="Subject"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-white dark:bg-[#062015]
        border border-gray-300 dark:border-green-500/20"
      />

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-green-600 text-white rounded-lg"
      >
        Create Exam
      </button>

    </div>
  );
}