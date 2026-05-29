const API_BASE_URL = "http://localhost:4000/api";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN";
}

// Fake emails to simulate existing users in the database
const mockUserDatabase = [
  { email: "johndoe@test.com", password: "johndoe123" },
  { email: "user@test.com", password: "user123" },
  { email: "admin@test.com", password: "admin123" },
];

// services/authService.ts

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

    // We no longer look for a token here. We just return success!
    return {
      success: true,
      message: data.status || "Account created successfully!",
    };
  } catch (error: any) {
    console.error("Signup error:", error);
    return { success: false, message: error.message };
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
    }
    return {
      success: true,
      message: data.message || "Login successful!",
      role: data.user?.role,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: error.message };
  }
};

export const mockGetUserProfile = async (): Promise<{
  success: boolean;
  data?: UserProfile;
  message?: string;
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 1. Check who is currently logged in by looking at localStorage
  const currentRole = localStorage.getItem("userRole") || "USER";

  // 2. Return the Admin profile if they are an admin
  if (currentRole === "ADMIN") {
    return {
      success: true,
      data: {
        firstName: "Jane",
        lastName: "Smith",
        email: "admin@test.com",
        role: "ADMIN",
      },
    };
  }

  // 3. Otherwise, return the standard User (John Doe) profile
  return {
    success: true,
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "user@test.com",
      role: "USER",
    },
  };
};

export const mockUpdateUserProfile = (
  data: Partial<UserProfile>,
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Profile updated successfully" });
    }, 1000);
  });
};

export const mockChangePassword = (
  password: string,
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Password changed successfully" });
    }, 1000);
  });
};

export const mockDeleteAccount = (): Promise<{
  success: boolean;
  message: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Account deleted successfully" });
    }, 1500);
  });
};
