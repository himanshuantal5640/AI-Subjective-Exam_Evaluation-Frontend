import React, { useState } from "react";
import { createExam } from "../../services/teacherService";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { BookOpen, Clock, Award, PenTool, Layout, CheckCircle, Plus, Trash2, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateExam() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    duration: "60",
    totalMarks: "100",
    questions: [{ text: "", totalMarks: 10 }]
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...form.questions];
    newQuestions[index].text = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleQuestionMarksChange = (index, value) => {
    const newQuestions = [...form.questions];
    newQuestions[index].totalMarks = parseInt(value) || 0;
    setForm({ ...form, questions: newQuestions });
  };

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [...form.questions, { text: "", totalMarks: 10 }]
    });
  };

  const removeQuestion = (index) => {
    if (form.questions.length === 1) return toast.error("At least one question is required");
    const newQuestions = form.questions.filter((_, i) => i !== index);
    setForm({ ...form, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.subject || !form.duration || !form.totalMarks) {
      return toast.error("All basic fields are mandatory");
    }

    const invalidQuestion = form.questions.find(q => !q.text.trim());
    if (invalidQuestion) {
      return toast.error("All questions must have text");
    }

    try {
      setLoading(true);
      await createExam(form);
      toast.success("Examination Created Successfully!");
      navigate('/teacher/manage'); // CORRECTED PATH
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-3 rounded-2xl ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
          <PenTool size={28} />
        </div>
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Initialize New Examination
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
            Construct your AI-evaluated subjective test with questions.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
          {/* Config Section */}
          <div className={`lg:col-span-1 space-y-6`}>
            <div className={`${
              darkMode ? 'bg-[#07100a] border-green-500/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'
            } border rounded-3xl p-6 transition-all`}>
              <h2 className={`text-sm font-bold uppercase tracking-widest ${darkMode ? 'text-green-400/80' : 'text-green-600'} mb-6 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'} pb-4`}>
                Exam Configuration
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-2 block`}>
                    Exam Title
                  </label>
                  <div className="relative">
                    <Layout className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={16} />
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Mid-Term Review"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                        darkMode ? 'bg-black/40 border-green-500/10 text-white focus:border-green-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-2 block`}>
                    Subject
                  </label>
                  <div className="relative">
                    <BookOpen className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={16} />
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Computer Science"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                        darkMode ? 'bg-black/40 border-green-500/10 text-white focus:border-green-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-2 block`}>
                      Duration (Min)
                    </label>
                    <input
                      name="duration"
                      type="number"
                      value={form.duration}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                        darkMode ? 'bg-black/40 border-green-500/10 text-white focus:border-green-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-2 block`}>
                      Total Marks
                    </label>
                    <input
                      name="totalMarks"
                      type="number"
                      value={form.totalMarks}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                        darkMode ? 'bg-black/40 border-green-500/10 text-white focus:border-green-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                       }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold uppercase tracking-[2px] text-sm transition-all shadow-lg active:scale-95 ${
                loading 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/30'
              }`}
            >
              {loading ? "Deploying Exam..." : "Create Examination"}
            </button>
          </div>

          {/* Questions Section */}
          <div className={`lg:col-span-2 space-y-6`}>
            <div className={`${
              darkMode ? 'bg-[#07100a] border-green-500/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'
            } border rounded-3xl p-8 transition-all`}>
              <div className="flex justify-between items-center mb-8 border-b dark:border-white/5 pb-4">
                <h2 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <HelpCircle size={20} className="text-green-500" /> Question List
                </h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    darkMode ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  <Plus size={16} /> Add Question
                </button>
              </div>

              <div className="space-y-6">
                {form.questions.map((q, index) => (
                  <div key={index} className={`p-6 rounded-2xl border transition-all ${
                    darkMode ? 'bg-black/30 border-white/5 hover:border-green-500/30' : 'bg-gray-50 border-gray-100 hover:border-green-200'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] uppercase tracking-widest font-black ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                        Question {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <textarea
                        value={q.text}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        placeholder="Enter the subjective question here..."
                        className={`w-full p-4 rounded-xl border text-sm transition-all outline-none resize-none h-24 ${
                          darkMode ? 'bg-black/40 border-white/5 text-white focus:border-green-500/50' : 'bg-white border-gray-200 text-gray-900 focus:border-green-500 shadow-sm'
                        }`}
                      />
                      <div className="flex items-center gap-3">
                        <label className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          Allotted Marks:
                        </label>
                        <input
                          type="number"
                          value={q.totalMarks}
                          onChange={(e) => handleQuestionMarksChange(index, e.target.value)}
                          className={`w-24 px-3 py-1.5 rounded-lg border text-sm transition-all outline-none ${
                            darkMode ? 'bg-black/40 border-white/5 text-white focus:border-green-500/50' : 'bg-white border-gray-200 text-gray-900 focus:border-green-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}