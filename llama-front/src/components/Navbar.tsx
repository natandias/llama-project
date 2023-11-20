"use client";
import Image from "next/image";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Fragment, useState } from "react";

const MenuItems = () => {
  return (
    <Fragment>
      <div className="flex flex-row gap-10 ml-auto">
        <h1>Produto</h1>
        <h1>Funcionalidades</h1>
        <h1>Quem somos</h1>
      </div>

      <button className="ml-auto mr-4 bg-primary text-white p-3 px-8 rounded-md">
        <a href="/api/auth/login">Log in</a>
      </button>
    </Fragment>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="flex flex-row bg-white w-screen m-0 mb-10 h-20">
      <div className="hidden md:flex flex-row w-full justify-center items-center m-auto">
        <Image
          alt="Intelimaker Logo"
          src="/android-chrome-192x192.png"
          className="ml-4"
          width={70}
          height={70}
        />
        <MenuItems />
      </div>

      <div className="flex md:hidden ml-auto shadow-xl">
        <button
          type="button"
          className="mr-2 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
          className="mr-2 mt-4 inline-flex items-center justify-end rounded-md p-2.5 text-white"
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
