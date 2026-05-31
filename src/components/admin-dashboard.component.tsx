import React from "react";
import type { Room, RoomStatus } from "../types/types";
import MapGridComponent from "./mapgrid.component";

import { getAllRooms, updateRoomStatus } from "../services/room.service";

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

    // Tell the backend to update it permanently
    const response = await updateRoomStatus(roomId, newStatus);

    // If successful, update the screen with the fresh database info
    if (response.success && response.data) {
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === roomId ? response.data! : room)),
      );
    } else {
      console.error(response.message);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleUpdateRoom = (
    roomId: number,
    newName: string,
    newStatus: RoomStatus,
  ) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              name: newName,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : room,
      ),
    );
  };

  const handleDeleteRoom = (roomId: number) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
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
