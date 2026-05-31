const API_BASE_URL = "http://localhost:4000/api";

export interface UserProfile {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN";
}

export const signUpUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    return {
      success: true,
      message: data.status || "Account created successfully!",
    };
  } catch (error: unknown) {
    console.error("Sign-up error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during registration.";

    return { success: false, message: errorMessage };
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ success: boolean; message: string; role?: "USER" | "ADMIN" }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Invalid credentials.");
    }
    if (data.user && data.user.role) {
      localStorage.setItem("authToken", data.user.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return {
      success: true,
      message: data.message || "Login successful!",
      role: data.user?.role,
    };
  } catch (error: unknown) {
    console.error("Login error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during login.";
    return { success: false, message: errorMessage };
  }
};

export const updateUserProfile = async (payload: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}): Promise<{
  success: boolean;
  data?: Partial<UserProfile>;
  message?: string;
}> => {
  try {
    const token = localStorage.getItem("authToken");

    const savedUser = localStorage.getItem("user");
    if (!savedUser)
      throw new Error("User session not found. Please log in again.");

    const parsedUser = JSON.parse(savedUser);
    const userId = parsedUser.id;

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Failed to save profile changes.");

    if (data.user) {
      const updatedLocalUser = { ...parsedUser, ...data.user };
      localStorage.setItem("user", JSON.stringify(updatedLocalUser));
    }

    return {
      success: true,
      data: data.user,
      message: data.status,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred updating profile.",
    };
  }
};
