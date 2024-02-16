import { Fragment, useState } from "react";

const MenuItems = () => {
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row gap-10 md:ml-auto text-center -mt-16 md:mt-0">
        {/* <h1>Produto</h1>
        <h1>Quem somos</h1> */}
      </div>

      <a
        className="md:ml-auto md:mr-4 bg-white md:bg-primary md:hover:bg-primary_hover text-black font-semibold text-lg p-3 px-8 rounded-md"
        href="/api/auth/login"
      >
        Entrar
      </a>
    </Fragment>
  );
};
export default MenuItems;
