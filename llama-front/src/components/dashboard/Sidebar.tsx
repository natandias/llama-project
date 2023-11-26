import { LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";

type props = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: props) {
  return (
    <aside
      className={`h-page-mobile md:h-page flex flex-col gap-5 ${
        isOpen
          ? "absolute md:relative w-full md:w-72 text-black"
          : "relative w-0 text-transparent"
      } bg-zinc-200 transition-all ease-in-out delay-200 text-center pt-6`}
    >
      <Link className="text-xl" href="/dashboard">
        Meus sites
      </Link>

      <h1 className="text-xl">Perfil</h1>

      <a
        className={`flex items-center justify-center text-xl ${
          isOpen ? "text-red-500" : "text-transparent"
        } mt-auto mb-10`}
        href="/api/auth/logout"
      >
        Logout <LogoutOutlined className="ml-4" />
      </a>
    </aside>
  );
}
