export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
// Fake emails to simulate existing users in the database
const mockUserDatabase = [
  { email: "johndoe@test.com", password: "johndoe123" },
  { email: "user@test.com", password: "user123" },
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
