import React, { useState } from 'react';

export default function AdminAddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate backend call
    alert('User creation requested:\n' + JSON.stringify(formData, null, 2));
    setFormData({ name: '', email: '', role: 'student', password: '' });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="mb-8">
        <h1 className="text-[28px] md:text-[34px] font-bold font-['Orbitron'] text-white tracking-[1px] leading-tight">
          Create User Account
        </h1>
        <p className="text-[rgba(220,200,255,0.58)] font-['JetBrains_Mono'] text-[13px] mt-[6px]">
          Provision new faculty or student access to NexusEval
        </p>
      </div>

      <div className="bg-[#08060f]/80 backdrop-blur-md rounded-[18px] border border-[#dc50ff]/10 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-[#38d9ff]/10 to-transparent pointer-events-none rounded-bl-full"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-[#38d9ff] font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-2">Full Name</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#dc50ff] transition-colors font-['JetBrains_Mono'] text-sm"
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div>
            <label className="block text-[#38d9ff] font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-2">Email Address</label>
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#dc50ff] transition-colors font-['JetBrains_Mono'] text-sm"
              placeholder="jane@nexuseval.edu"
            />
          </div>

          <div>
            <label className="block text-[#38d9ff] font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-2">Account Role</label>
            <select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#dc50ff] transition-colors font-['JetBrains_Mono'] text-sm"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div>
            <label className="block text-[#38d9ff] font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-2">Temporary Password</label>
            <input 
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password" 
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#dc50ff] transition-colors font-['JetBrains_Mono'] text-sm"
              placeholder="••••••••"
            />
            <p className="text-[10px] text-gray-400 mt-2 font-['JetBrains_Mono']">User will be prompted to change this upon first login.</p>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-[#dc50ff] to-[#ff3d6e] hover:shadow-[0_0_20px_rgba(220,80,255,0.4)] text-white px-[24px] py-[14px] rounded-[12px] font-bold font-['JetBrains_Mono'] text-[14px] tracking-[2px] uppercase transition-all duration-300"
          >
            Provision User
          </button>

        </form>
      </div>
    </div>
  );
}
