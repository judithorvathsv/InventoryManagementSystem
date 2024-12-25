import { NavLink } from "react-router-dom";

const NavBar = ({ hideMobileNavBar }: { hideMobileNavBar: () => void }) => {
  return (
    <aside className="flex flex-col w-52 bg-gray-200 p-4 h-full relative  z-50 ">
      <h2 className="title mb-4 font-bolder">Menu</h2>

      <ul className="flex flex-col space-y-4">
        <li onClick={hideMobileNavBar}>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder ${
                isActive ? "active-link font-bolder text-lg" : "text-black"
              }`
            }
          >
            All Products
          </NavLink>
        </li>

        <li onClick={hideMobileNavBar}>
          <NavLink
            to="/newpurchase"
            className={({ isActive }) =>
              `block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder ${
                isActive ? "active-link font-bolder text-lg" : "text-black"
              }`
            }
          >
            New Purchase
          </NavLink>
        </li>

        <li onClick={hideMobileNavBar}>
          <NavLink
            to="/purchases"
            className={({ isActive }) =>
              `block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder ${
                isActive ? "active-link font-bolder text-lg" : "text-black"
              }`
            }
          >
            All Purchases
          </NavLink>
        </li>
        <li onClick={hideMobileNavBar}>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder ${
                isActive ? "active-link font-bolder text-lg" : "text-black"
              }`
            }
          >
            Inventory
          </NavLink>
        </li>
        <li onClick={hideMobileNavBar}>
          <NavLink
            to="/incoming-purchases"
            className={({ isActive }) =>
              `block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder ${
                isActive ? "active-link font-bolder text-lg" : "text-black"
              }`
            }
          >
            Incoming Purchases
          </NavLink>
        </li>
        <li onClick={hideMobileNavBar}>
          <NavLink
            to="/outgoing-orders"
            className={({ isActive }) =>
              `block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder ${
                isActive ? "active-link font-bolder text-lg" : "text-black"
              }`
            }
          >
            Outgoing Orders
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default NavBar;
