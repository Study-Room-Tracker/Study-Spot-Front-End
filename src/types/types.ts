export type RoomStatus = "FREE" | "FULL";

export interface Room {
  id: number;
  name: string;
  status: RoomStatus;
  createdAt: string;
  updatedAt: string;
}
