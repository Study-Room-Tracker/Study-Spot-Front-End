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

    // FIX 1: Removed the extra /api from the template literal string
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

    // FIX 2: Changed data.rooms to data.data to match your exact backend response key
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
