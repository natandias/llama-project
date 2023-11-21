"use client";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <section className="flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-row w-full">
        <Sidebar isOpen={isSidebarOpen} />
        <div
          className={`w-full h-full md:pl-5 pt-10 ${
            isSidebarOpen ? "invisible md:visible" : "visible md:visible"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
