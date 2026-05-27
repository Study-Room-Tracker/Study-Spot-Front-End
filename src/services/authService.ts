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

export const mockGetUserProfile = (): Promise<{
  success: boolean;
  data?: UserProfile;
  message?: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@test.com",
          role: "USER",
        },
      });
    }, 800);
  });
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
