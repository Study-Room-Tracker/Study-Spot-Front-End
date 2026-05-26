import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar.component";
import FooterComponent from "../components/footer.component";

interface MainLayoutProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const MainLayout = ({ isLoggedIn, setIsLoggedIn }: MainLayoutProps) => {
  const [activeMenu, setActiveMenu] = React.useState<"login" | "signup" | null>(
    null,
  );
  return (
    <div className="layout">
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <main>
        <Outlet context={{ setActiveMenu }} />
      </main>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
