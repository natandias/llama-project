import { Fragment } from "react";
import { useRouter } from "next/navigation";
import ROUTES_CONSTANTS from "../../../constants/routes_constants";

type MenuItemsProps = {
  isLogged: boolean;
};

const loginButtonClassnames =
  "md:ml-auto md:mr-4 bg-white md:bg-primary md:hover:bg-primary_hover text-black font-semibold text-lg p-3 px-8 rounded-md";

const MenuItems = ({ isLogged }: MenuItemsProps) => {
  const router = useRouter();

  const goToDashboard = () => router.push(ROUTES_CONSTANTS.DASHBOARD_SITES);

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row gap-10 md:ml-auto text-center -mt-16 md:mt-0">
        {/* <h1>Produto</h1>
        <h1>Quem somos</h1> */}
      </div>

      {isLogged ? (
        <button className={loginButtonClassnames} onClick={goToDashboard}>
          Ir para o meu dashboard
        </button>
      ) : (
        <a className={loginButtonClassnames} href="/api/auth/login">
          Entrar
        </a>
      )}
    </Fragment>
  );
};
export default MenuItems;
