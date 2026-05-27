import { useState } from "react";
import { mockRooms } from "../data";
import type { Room, RoomStatus } from "../types/types";

interface MapGridProps {
  rooms?: Room[];
  onToggleStatus?: (roomId: number) => void;
  onDeleteRoom?: (roomId: number) => void;
  onUpdateRoom?: (
    roomId: number,
    newName: string,
    newStatus: RoomStatus,
  ) => void;
  isAdmin?: boolean;
}

const MapGridComponent = ({
  rooms: propRooms,
  onToggleStatus,
  onDeleteRoom,
  onUpdateRoom,
  isAdmin = false,
}: MapGridProps) => {
  const [localRooms, setLocalRooms] = useState<Room[]>(mockRooms);
  const rooms = propRooms || localRooms;

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editStatus, setEditStatus] = useState<RoomStatus>("FREE");

  const toggleRoomStatus = (roomId: number) => {
    if (onToggleStatus) {
      onToggleStatus(roomId);
    } else {
      setLocalRooms((prevRooms) =>
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
    }
    // prevRooms is the current state of localRooms before the update so originally it is mockRooms
  };

  const startEditing = (room: Room) => {
    setEditId(room.id);
    setEditName(room.name);
    setEditStatus(room.status);
  };

  const handleSave = (roomId: number) => {
    if (!editName.trim()) return;

    if (onUpdateRoom) {
      onUpdateRoom(roomId, editName, editStatus);
    }
    setEditId(null); // Turn off edit mode
  };
  return (
    <>
      <h2 className="section-title">
        {isAdmin ? "Manage Rooms" : "Available Rooms"}
      </h2>
      <div className="map-grid">
        {rooms.map((room) => {
          const isEditing = editId === room.id;
          return (
            <div key={room.id} className="room">
              {isEditing ? (
                <div className="edit-room-form">
                  <label htmlFor="editName">Room Name:</label>
                  <input
                    type="text"
                    id="editName"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <label htmlFor="editStatus">Status:</label>
                  <select
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(e.target.value as RoomStatus)
                    }
                  >
                    <option value="FREE">FREE</option>
                    <option value="FULL">FULL</option>
                  </select>
                  <div>
                    <button
                      onClick={() => handleSave(room.id)}
                      className="status-btn"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2>{room.name}</h2>
                  <p>Status: {room.status}</p>
                  <p>
                    Last Updated: {new Date(room.updatedAt).toLocaleString()}
                  </p>
                  <div className="room-actions">
                    <button
                      className="status-btn"
                      onClick={() => toggleRoomStatus(room.id)}
                    >
                      Set to {room.status === "FREE" ? "FULL" : "FREE"}
                    </button>

                    {/*Admin only features*/}
                    {isAdmin && (
                      <>
                        <button
                          className="edit-room-btn"
                          onClick={() => startEditing(room)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-room-btn"
                          onClick={() => onDeleteRoom && onDeleteRoom(room.id)}
                        >
                          Delete Room
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MapGridComponent;
