"use client";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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
      <div className="flex flex-row w-full ">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`h-full flex justify-center w-full pb-10   ${
            isSidebarOpen
              ? "invisible md:visible md:ml-72"
              : "visible md:visible"
          }`}
        >
          {children}
          <ToastContainer />
        </div>
      </div>
    </section>
  );
}
