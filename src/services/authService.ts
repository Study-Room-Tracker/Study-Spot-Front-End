export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
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

export const mockSignUp = (
  data: SignUpData,
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        mockUserDatabase.some((user) => user.email === data.email.toLowerCase())
      ) {
        resolve({ success: false, message: "Email already in use" });
      } else {
        resolve({ success: true, message: "Sign up successful" });
      }
    }, 1500);
  });
};

export const mockLogin = (
  data: LoginData,
): Promise<{ success: boolean; message: string; token?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUserDatabase.find(
        (user) => user.email.toLocaleLowerCase() === data.email.toLowerCase(),
      );
      if (!user) {
        resolve({
          success: false,
          message: "No account found with this email.",
        });
      } else if (user.password !== data.password) {
        resolve({
          success: false,
          message: "Invalid password. Please try again.",
        });
      } else {
        resolve({
          success: true,
          message: "Login successful",
          token: "fake-jwt-token",
        });
      }
    }, 1200);
  });
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
