"use client";
import { useState } from "react";
import Image from "next/image";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import MenuItems from "@/components/MenuItems";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className="flex flex-row w-screen m-0 
    h-20 bg-zinc-200 shadow-xl"
    >
      <Image
        alt="Intelimaker Logo"
        src="/android-chrome-192x192.png"
        className="ml-4"
        width={80}
        height={80}
      />
      <div className="hidden md:flex flex-row w-full justify-center items-center m-auto">
        <MenuItems />
      </div>

      <div className="flex md:hidden ml-auto ">
        <button
          type="button"
          className="mr-2 inline-flex items-center justify-center rounded-md px-2.5 text-gray-700"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Abrir menu</span>
          <MenuOutlined className="text-xl" />
        </button>
      </div>
      <div
        className={`${
          isMobileMenuOpen ? "fixed" : "hidden"
        } w-full h-full overflow-auto z-50  flex flex-col text-xl bg-primary text-white`}
      >
        <button
          type="button"
          className="mr-2 mt-6 inline-flex items-center justify-end rounded-md p-2.5 text-white"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Fechar menu</span>
          <CloseOutlined onClick={toggleMobileMenu} />
        </button>

        <div className="flex flex-col justify-center items-center h-full gap-10">
          <MenuItems />
        </div>
      </div>
    </nav>
  );
}
