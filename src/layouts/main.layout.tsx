import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar.component";
import FooterComponent from "../components/footer.component";

interface MainLayoutProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setUserRole: (role: "USER" | "ADMIN" | null) => void;
}

const MainLayout = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserRole,
}: MainLayoutProps) => {
  const [activeMenu, setActiveMenu] = React.useState<"login" | "signup" | null>(
    null,
  );
  return (
    <div className="layout">
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserRole={setUserRole}
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
