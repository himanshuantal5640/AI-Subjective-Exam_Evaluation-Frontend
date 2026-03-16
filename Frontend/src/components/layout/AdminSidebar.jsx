import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminSidebar({ isSidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "⊞" },
    { name: "All Teachers", path: "/admin/teachers", icon: "🎓", badge: { text: "12", type: "primary" } },
    { name: "All Students", path: "/admin/students", icon: "👥", badge: { text: "142", type: "gold" } },
    { name: "Add User", path: "/admin/add-user", icon: "➕" },
    { name: "All Exams", path: "/admin/exams", icon: "📋", badge: { text: "24", type: "sky" } },
    { name: "Audit Logs", path: "/admin/logs", icon: "📜", badge: { text: "3", type: "rose" } },
    { name: "System Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#08060f]/92 border-r border-[#dc50ff]/10 backdrop-blur-md flex flex-col py-[26px] overflow-y-auto transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        <div className="px-[22px] pb-[26px] border-b border-[#dc50ff]/10 mb-[22px]">
          <div className="w-[46px] h-[46px] bg-gradient-to-br from-[#dc50ff] to-[#ff3d6e] rounded-[13px] flex items-center justify-center text-[22px] mb-[10px] shadow-[0_0_24px_rgba(220,80,255,0.28)]">
            🛡️
          </div>
          <div className="font-['Orbitron'] text-[13px] font-bold tracking-[3px] bg-gradient-to-r from-[#dc50ff] to-[#ffb830] bg-clip-text text-transparent uppercase">
            NexusEval
          </div>
          <div className="text-[10px] text-[rgba(180,150,220,0.38)] tracking-[1px] mt-[2px]">
            AI EXAM EVALUATION
          </div>
          <div className="inline-block mt-[8px] text-[9px] font-bold tracking-[2.5px] uppercase py-[3px] px-[10px] rounded-[20px] bg-[rgba(220,80,255,0.12)] text-[#dc50ff] border border-[rgba(220,80,255,0.3)] font-['JetBrains_Mono'] shadow-[0_0_12px_rgba(220,80,255,0.15)]">
            ⚡ Admin Portal
          </div>
        </div>

        <div className="px-[11px] mb-[8px]">
          <div className="text-[9px] font-semibold tracking-[2px] text-[rgba(180,150,220,0.38)] uppercase px-[11px] mb-[8px] font-['JetBrains_Mono']">
            Command Center
          </div>
          
          {navItems.slice(0,1).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-[11px] px-[13px] py-[11px] rounded-[10px] cursor-pointer transition-all duration-200 relative overflow-hidden mb-[2px] group ${
                isActive 
                  ? 'border border-[rgba(220,80,255,0.35)] shadow-[inset_0_0_20px_rgba(220,80,255,0.05)]' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#dc50ff] to-[#ffb830] opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none rounded-[10px]"></div>
              <span className={`text-[15px] w-[20px] text-center relative z-10 transition-all duration-200`}>
                {item.icon}
              </span>
              <span className={`text-[13px] font-semibold relative z-10 transition-colors duration-200 tracking-[0.3px] text-[rgba(220,200,255,0.62)] group-hover:text-[#f0e6ff]`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        <div className="px-[11px] mb-[8px] mt-[4px]">
          <div className="text-[9px] font-semibold tracking-[2px] text-[rgba(180,150,220,0.38)] uppercase px-[11px] mb-[8px] font-['JetBrains_Mono']">
            User Management
          </div>
          {navItems.slice(1,4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-[11px] px-[13px] py-[11px] rounded-[10px] cursor-pointer transition-all duration-200 relative overflow-hidden mb-[2px] group ${
                isActive 
                  ? 'border border-[rgba(220,80,255,0.35)] shadow-[inset_0_0_20px_rgba(220,80,255,0.05)] bg-gradient-to-r from-[#dc50ff]/10 to-transparent' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
               <span className={`text-[15px] w-[20px] text-center relative z-10 transition-all duration-200`}>
                {item.icon}
              </span>
              <span className={`text-[13px] font-semibold relative z-10 transition-colors duration-200 tracking-[0.3px] text-[rgba(220,200,255,0.62)] group-hover:text-[#f0e6ff]`}>
                {item.name}
              </span>
              {item.badge && (
                <span className={`ml-auto text-[10px] font-bold py-[2px] px-[7px] rounded-[20px] relative z-10 font-['JetBrains_Mono'] ${
                  item.badge.type === 'primary' ? 'bg-gradient-to-br from-[#dc50ff] to-[#ff3d6e] text-white' : 'bg-gradient-to-br from-[#ffb830] to-[#f97316] text-[#030206]'
                }`}>
                  {item.badge.text}
                </span>
              )}
            </NavLink>
          ))}
        </div>
        
        <div className="px-[11px] mb-[8px] mt-[4px]">
          <div className="text-[9px] font-semibold tracking-[2px] text-[rgba(180,150,220,0.38)] uppercase px-[11px] mb-[8px] font-['JetBrains_Mono']">
            System
          </div>
          {navItems.slice(4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-[11px] px-[13px] py-[11px] rounded-[10px] cursor-pointer transition-all duration-200 relative overflow-hidden mb-[2px] group ${
                isActive 
                  ? 'border border-[rgba(220,80,255,0.35)] shadow-[inset_0_0_20px_rgba(220,80,255,0.05)] bg-gradient-to-r from-[#dc50ff]/10 to-transparent' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
               <span className={`text-[15px] w-[20px] text-center relative z-10 transition-all duration-200`}>
                {item.icon}
              </span>
              <span className={`text-[13px] font-semibold relative z-10 transition-colors duration-200 tracking-[0.3px] text-[rgba(220,200,255,0.62)] group-hover:text-[#f0e6ff]`}>
                {item.name}
              </span>
              {item.badge && (
                <span className={`ml-auto text-[10px] font-bold py-[2px] px-[7px] rounded-[20px] relative z-10 font-['JetBrains_Mono'] ${
                  item.badge.type === 'sky' ? 'bg-[rgba(56,217,255,0.15)] text-[#38d9ff] border border-[rgba(56,217,255,0.25)]' : 'bg-[rgba(255,61,110,0.85)] text-white'
                }`}>
                  {item.badge.text}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto px-[22px] pt-[18px] border-t border-[rgba(220,80,255,0.1)]">
          <div 
            onClick={handleLogout}
            className="flex items-center gap-[11px] p-[11px] rounded-[12px] bg-[rgba(220,80,255,0.04)] border border-[rgba(220,80,255,0.1)] cursor-pointer transition-all duration-200 hover:border-[rgba(220,80,255,0.35)] group"
          >
            <div className="w-[36px] h-[36px] rounded-[10px] bg-gradient-to-br from-[#dc50ff] to-[#ff3d6e] flex items-center justify-center text-[13px] font-bold font-['Orbitron'] text-white shrink-0">
              SA
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#f0e6ff] group-hover:text-red-400">Logout (Super Admin)</div>
              <div className="text-[10px] text-[rgba(180,150,220,0.38)] mt-[1px]">System Administrator</div>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
