import React from "react";
import MapGridComponent from "../components/mapgrid.component";
import AdminDashboardComponent from "../components/admin-dashboard.component";

interface HomePageProps {
  userRole: "USER" | "ADMIN" | null;
}

const HomePage: React.FC<HomePageProps> = ({ userRole }) => {
  if (userRole === "ADMIN") {
    return <AdminDashboardComponent />;
  }
  return (
    <div>
      <MapGridComponent />
    </div>
  );
};

export default HomePage;
