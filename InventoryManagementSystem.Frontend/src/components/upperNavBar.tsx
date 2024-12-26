import NavBar from "./navBar";
import menu from "../../public/images/menu.svg";
import { useState } from "react";

const UpperNavBar = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const showNavBar = () => {
    setMenuIsVisible((prev: boolean) => !prev);
  };

  const hideUpperNavBar = () => {
    setMenuIsVisible(false);
  };

  return (
    <div className="flex flex-col bg-gray-200 p-2 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <img
          src={menu}
          alt="menu icon"
          onClick={showNavBar}
          className="w-[2rem] cursor-pointer lg:hidden"
        />
        <h1 className="title text-center flex-grow pb-2">
          Inventory Management System
        </h1>
      </div>

      {menuIsVisible && (
        <div className="absolute top-full left-0 z-100">
          <NavBar hideMobileNavBar={hideUpperNavBar} />
        </div>
      )}
    </div>
  );
};

export default UpperNavBar;
