const API_BASE_URL = "http://localhost:4000/api";

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
      throw new Error(data.message || "Failed to send message to the server.");
    }

    return {
      success: true,
      message: data.status,
    };
  } catch (error: unknown) {
    console.error("Error sending contact message:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected network error occurred.";

    return { success: false, message: errorMessage };
  }
};
