import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/layout/TeacherSidebar";
import TeacherTopbar from "../components/teacher/TeacherTopbar";
import TeacherChatButton from "../components/teacher/TeacherChatButton";

export default function TeacherLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#04120a] transition-colors duration-300">

      <TeacherSidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">

        <TeacherTopbar setOpen={setOpen} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

      <TeacherChatButton />
    </div>
  );
}