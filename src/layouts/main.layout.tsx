import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar.component";
import FooterComponent from "../components/footer.component";

const MainLayout = () => {
  return (
    <div className="layout">
      <NavbarComponent />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
