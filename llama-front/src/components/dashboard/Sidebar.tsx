import { LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";

type props = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const pageRoutes = {
  mySites: "/dashboard/sites",
};

export default function Sidebar({ isOpen, toggleSidebar }: props) {
  const currentPage = usePathname();

  return (
    <aside
      className={`flex flex-col gap-5 top-0 left-0 pt-12 fixed h-full ${
        isOpen ? "w-full md:w-72 text-black z-30" : "w-0 text-transparent"
      } bg-zinc-200 transition-[width] ease-in-out delay-100 text-center `}
    >
      <button
        type="button"
        className={`ml-[12.48px] -mt-[18.08px] mb-6 inline-flex justify-start rounded-md px-2.5 text-gray-700 ${
          !isOpen ? "invisible" : ""
        }  md:visible`}
        onClick={toggleSidebar}
      >
        <span className="sr-only">Abrir menu</span>
        <MenuOutlined className="text-xl" />
      </button>

      <Link
        className={`text-xl p-4 ${
          currentPage.startsWith(pageRoutes.mySites) && isOpen
            ? "bg-white"
            : "bg-transparent"
        } `}
        href={pageRoutes.mySites}
      >
        Meus sites
      </Link>

      {/* <h1 className="text-xl p-4">Perfil</h1> */}

      <a
        className={`flex items-center justify-center text-xl ${
          isOpen ? "text-red-500" : "text-transparent"
        } mt-auto mb-10`}
        href="/api/auth/logout"
      >
        Sair <LogoutOutlined className="ml-4" />
      </a>
    </aside>
  );
}
