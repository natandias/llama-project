"use client";
import Navbar from "@/components/dashboard/Navbar.1";
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
          className={`pl-5 ${
            isSidebarOpen ? "invisible md:visible" : "visible md:visible"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
