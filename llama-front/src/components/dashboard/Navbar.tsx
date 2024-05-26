import Image from "next/image";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

type props = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: props) {
  return (
    <nav className="flex flex-row w-screen m-0 h-20 bg-zinc-200 shadow-xl z-20 mb-6">
      <button
        type="button"
        className="ml-[19px] inline-flex items-center justify-center rounded-md px-2.5 text-gray-700 z-50 visible"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Abrir menu</span>
        <MenuOutlined className="text-xl " />
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
