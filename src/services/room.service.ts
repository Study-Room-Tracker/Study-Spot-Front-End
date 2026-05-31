const API_BASE_URL = "http://localhost:4000/api";

export interface Room {
  id: number;
  name: string;
  status: "FREE" | "FULL";
  createdAt: string;
  updatedAt: string;
}

export const getAllRooms = async (): Promise<{
  success: boolean;
  data: Room[];
  message?: string;
}> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to retrieve rooms.");
    }

    return { success: true, data: data.data };
  } catch (error: unknown) {
    console.error("Error fetching rooms:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected network error occurred.";

    return {
      success: false,
      data: [],
      message: errorMessage,
    };
  }
};

export const updateRoomStatus = async (
  roomId: number,
  newStatus: "FREE" | "FULL",
): Promise<{ success: boolean; data?: Room; message?: string }> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch(
      `${API_BASE_URL}/rooms/changeStatus/${roomId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },

        body: JSON.stringify({ status: newStatus }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update room status.");
    }

    return {
      success: true,
      data: data.data,
      message: data.status,
    };
  } catch (error: unknown) {
    console.error(`Error updating room ${roomId}:`, error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected network error occurred.";

    return { success: false, message: errorMessage };
  }
};
