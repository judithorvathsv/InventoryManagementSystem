import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <aside className="flex flex-col w-52 bg-gray-200 p-4 h-full ">
      <h2 className="title mb-4 font-bolder">Menu</h2>

      <ul className="flex flex-col space-y-4">
        <li>
          <Link
            to="/products"
            className="block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/purchases"
            className="block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder"
          >
            All Purchases
          </Link>
        </li>
        <li>
          <Link
            to="/inventory"
            className="block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder"
          >
            Inventory
          </Link>
        </li>
        <li>
          <Link
            to="/incoming-purchases"
            className="block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder"
          >
            Incoming Purchases
          </Link>
        </li>
        <li>
          <Link
            to="/outgoing-orders"
            className="block p-2 hover:bg-white rounded transition-colors duration-200 hover:shadow-lg hover:shadow-gray-400 font-normal hover:font-bolder"
          >
            Outgoing Orders
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default NavBar;
