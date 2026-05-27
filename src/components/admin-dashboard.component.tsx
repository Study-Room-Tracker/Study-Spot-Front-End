import React from "react";
import { mockRooms } from "../data";
import type { Room, RoomStatus } from "../types/types";
import MapGridComponent from "./mapgrid.component";

const AdminDashboardComponent = () => {
  const [rooms, setRooms] = React.useState<Room[]>(mockRooms);
  const [newRoomName, setNewRoomName] = React.useState<string>("");
  const [newRoomStatus, setNewRoomStatus] = React.useState<RoomStatus>("FREE");

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    const newRoom: Room = {
      id: Date.now(), // Generate unique ID
      name: newRoomName,
      status: newRoomStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRooms([...rooms, newRoom]);
    setNewRoomName(""); // Reset input field
    setNewRoomStatus("FREE"); // Reset status to default
  };

  const handleToggleStatus = (roomId: number) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: room.status === "FREE" ? "FULL" : "FREE",
              updatedAt: new Date().toISOString(),
            }
          : room,
      ),
    );
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
              updatedAt: new Date().toISOString(), // Refresh update stamp
            }
          : room,
      ),
    );
  };

  const handleDeleteRoom = (roomId: number) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
  };

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
