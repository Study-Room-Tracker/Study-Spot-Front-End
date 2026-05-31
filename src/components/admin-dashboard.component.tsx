import React from "react";
import type { Room, RoomStatus } from "../types/types";
import MapGridComponent from "./mapgrid.component";

import {
  getAllRooms,
  updateRoomStatus,
  adminUpdateRoom,
  adminDeleteRoom,
} from "../services/room.service";

const AdminDashboardComponent = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [newRoomName, setNewRoomName] = React.useState<string>("");
  const [newRoomStatus, setNewRoomStatus] = React.useState<RoomStatus>("FREE");

  React.useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getAllRooms();
        if (response.success) {
          setRooms(response.data);
        } else {
          setError(response.message || "Failed to load rooms from database.");
        }
      } catch (err: unknown) {
        setError("An unexpected network error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    const newRoom: Room = {
      id: Date.now(), // Temporary fake ID until backend handles it
      name: newRoomName,
      status: newRoomStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRooms([...rooms, newRoom]);
    setNewRoomName("");
    setNewRoomStatus("FREE");
  };

  const handleToggleStatus = async (roomId: number) => {
    const roomToUpdate = rooms.find((room) => room.id === roomId);
    if (!roomToUpdate) return;

    const newStatus = roomToUpdate.status === "FREE" ? "FULL" : "FREE";

    const response = await updateRoomStatus(roomId, newStatus);

    if (response.success && response.data) {
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === roomId ? response.data! : room)),
      );
    } else {
      console.error(response.message);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleUpdateRoom = async (
    roomId: number,
    newName: string,
    newStatus: RoomStatus,
  ) => {
    try {
      const response = await adminUpdateRoom(roomId, newName, newStatus);

      if (response.success && response.data) {
        const updatedRoomFromDB = response.data;

        setRooms((prevRooms) => {
          const updatedArray = prevRooms.map((room) =>
            room.id === roomId ? updatedRoomFromDB : room,
          );
          return updatedArray.sort((a, b) => a.id - b.id);
        });
      } else {
        console.error(
          `Admin update failed: ${response.message || "Unknown error"}`,
        );
      }
    } catch (err) {
      console.error("Admin update pipeline crashed:", err);
      console.error("A critical networking framework failure occurred.");
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    try {
      // 2. Fire the network request to drop it from PostgreSQL
      const response = await adminDeleteRoom(roomId);

      if (response.success) {
        // 3. Remove it from your local array state so it vanishes from the UI grid
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
      } else {
        // Alert if the database blocked the deletion (e.g. foreign key constraint)
        alert(`Delete failed: ${response.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete handler error:", err);
      alert("A network error occurred while trying to delete the room.");
    }
  };

  if (loading) return <div>Loading Admin Dashboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <MapGridComponent
        rooms={rooms}
        onToggleStatus={handleToggleStatus}
        onDeleteRoom={handleDeleteRoom}
        onUpdateRoom={handleUpdateRoom}
        isAdmin={true}
      />

      <hr />
      <div className="admin-dashboard-container">
        <h2>Admin Control Panel: Add Room</h2>
        <form onSubmit={handleAddRoom}>
          <div>
            <label htmlFor="roomName">Room Name:</label>
            <input
              type="text"
              id="roomName"
              placeholder="Type room name..."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="roomStatus">Status: </label>
            <select
              id="roomStatus"
              value={newRoomStatus}
              onChange={(e) => setNewRoomStatus(e.target.value as RoomStatus)}
            >
              <option value="FREE">FREE</option>
              <option value="FULL">FULL</option>
            </select>
          </div>
          <button type="submit" className="add-room-btn">
            + Create Room
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminDashboardComponent;
