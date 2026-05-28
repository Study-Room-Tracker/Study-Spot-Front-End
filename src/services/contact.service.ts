// services/contactService.ts

// 1. Define your backend's base URL (pointing to your Express server)
const API_BASE_URL = "http://localhost:4000";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// 2. Real POST Route: Sends form data to your PostgreSQL database
export const saveMessage = async (
  name: string,
  email: string,
  message: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Server responded with an error");
    }

    return {
      success: true,
      message: data.message || "Your message has been sent successfully!",
    };
  } catch (error: any) {
    console.error("Fetch error:", error);
    return {
      success: false,
      message: error.message || "Could not connect to the backend server.",
    };
  }
};

// 3. Real GET Route: Fetches database entries (If you decide to view them later)
export const getMessages = async (): Promise<{
  success: boolean;
  data: ContactMessage[];
  message?: string;
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Note: When you add authentication later, your Bearer Token goes here!
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch messages");
    }

    return { success: true, data: data.data };
  } catch (error: any) {
    console.error("Fetch error:", error);
    return { success: false, data: [], message: error.message };
  }
};
