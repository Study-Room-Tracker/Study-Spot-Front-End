import React from "react";
import MapGridComponent from "../components/mapgrid.component";
import AdminDashboardComponent from "../components/admin-dashboard.component";
import { getAllRooms } from "../services/room.service";
import type { Room } from "../services/room.service";

interface HomePageProps {
  userRole: "USER" | "ADMIN" | null;
}

const HomePage: React.FC<HomePageProps> = ({ userRole }) => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchLiveRooms = async () => {
      try {
        const response = await getAllRooms();
        if (response.success) {
          setRooms(response.data);
        } else {
          setError(response.message || "Failed to load campus rooms.");
        }
      } catch (err: unknown) {
        setError("An unexpected network error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (userRole !== "ADMIN") {
      fetchLiveRooms();
    }
  }, [userRole]);

  if (userRole === "ADMIN") {
    return <AdminDashboardComponent />;
  }

  if (loading) return <div>Checking room vacancies...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <MapGridComponent rooms={rooms} isAdmin={false} />
    </div>
  );
};

export default HomePage;
