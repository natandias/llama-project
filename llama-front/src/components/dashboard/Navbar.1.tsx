"use client";
import Image from "next/image";
import { MenuOutlined } from "@ant-design/icons";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="flex flex-row w-screen m-0 h-20 bg-zinc-200 shadow-xl">
      <button
        type="button"
        className="ml-4 inline-flex items-center justify-center rounded-md px-2.5 text-gray-700"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Abrir menu</span>
        <MenuOutlined className="text-xl mr-4" />
      </button>
      <Image
        alt="Intelimaker Logo"
        src="/android-chrome-192x192.png"
        className="ml-auto"
        width={80}
        height={80}
      />
    </nav>
  );
}
