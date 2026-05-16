import { useState } from "react";
import { mockRooms } from "../data";
import type { Room } from "../types/types";

const MapGridComponent: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const toggleRoomStatus = (roomId: number) => {
    // prevRooms is the current state of rooms before the update so originally it is mockRooms
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        // Finds the room that was clicked
        if (room.id === roomId) {
          // We use spread operator to create a new object with the updated status
          return {
            ...room,
            status: room.status === "FREE" ? "FULL" : "FREE",
          };
        }
        // Return all other rooms unchanged
        return room;
      }),
    );
  };

  return (
    <>
      <h2 className="section-title">Study Rooms</h2>
      <div className="map-grid">
        {rooms.map((room) => (
          <div key={room.id} className="room">
            <h2>{room.name}</h2>
            <p>Status: {room.status}</p>
            <button
              className="status-btn"
              onClick={() => toggleRoomStatus(room.id)}
            >
              Set to {room.status === "FREE" ? "FULL" : "FREE"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MapGridComponent;
