import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-[#030206] text-[#f0e6ff] font-['Rajdhani'] relative overflow-x-hidden">
      
      {/* Animated Backgrounds */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(220,80,255,0.028) 1px,transparent 1px), linear-gradient(90deg,rgba(220,80,255,0.028) 1px,transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[550px] h-[550px] rounded-full filter blur-[100px] bg-[#dc50ff] opacity-10 top-[-150px] right-[-120px]"></div>
        <div className="absolute w-[420px] h-[420px] rounded-full filter blur-[100px] bg-[#ffb830] opacity-[0.08] bottom-[-100px] left-[-80px]"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full filter blur-[100px] bg-[#ff3d6e] opacity-[0.07] top-[40%] left-[35%]"></div>
      </div>

      <AdminSidebar isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 flex flex-col relative z-10 overflow-y-auto w-full">
        {/* Topbar for mobile */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-[rgba(220,80,255,0.1)] bg-[#08060f]/90 backdrop-blur">
          <div className="font-['Orbitron'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            NexusEval Admin
          </div>
          <button onClick={() => setSidebarOpen(true)} className="text-white text-xl">
            ☰
          </button>
        </div>
        
        <div className="p-[30px] md:p-[36px]">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
