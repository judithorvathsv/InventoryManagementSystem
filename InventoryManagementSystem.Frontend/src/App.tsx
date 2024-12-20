import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/login" || location.pathname === "/";

  return (
    <div className={isLogin ? "" : "flex h-screen"}>
      {!isLogin && <NavBar />}
      <div className={isLogin ? "w-full" : ""}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
