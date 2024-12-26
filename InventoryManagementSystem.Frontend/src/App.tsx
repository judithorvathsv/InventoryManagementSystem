import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import UpperNavBar from "./components/upperNavBar";

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/login" || location.pathname === "/";
  const hideMobileNavBar = () => {};

  return (
    <div className={isLogin ? "" : "flex h-full"}>
      {!isLogin && (
        <div className="hidden lg:block z-50 h-screen">
          <div className="sideNavBar"></div>
          <NavBar hideMobileNavBar={hideMobileNavBar} />
        </div>
      )}

      <div className={isLogin ? "w-full" : "flex-grow"}>
        <UpperNavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
