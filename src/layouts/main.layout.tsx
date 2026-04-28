import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar.component";

const MainLayout = () => {
  return (
    <div className="layout">
      <NavbarComponent />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
