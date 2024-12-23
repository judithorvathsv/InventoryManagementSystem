import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import UpperNavBar from "./components/UpperNavBar";

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/login" || location.pathname === "/";

  return (
    <div className={isLogin ? "" : "flex h-screen"}>
      {!isLogin && (
        <div className="hidden lg:block">
          <NavBar />
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
