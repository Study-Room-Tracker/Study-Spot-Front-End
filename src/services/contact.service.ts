// services/contactService.ts

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// 1. Temporary local "database" storage
const mockMessagesStorage: ContactMessage[] = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@university.edu",
    message:
      "Is the Ada Lovelace lab open for booking during weekend hackathons?",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 2,
    name: "Marcus Vance",
    email: "m.vance@university.edu",
    message:
      "Left my MacBook charger in Room 302 yesterday afternoon. Has anyone turned it in?",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
  },
];

// 2. Mock POST Route: Simulates saving a message
export const mockSaveMessage = async (
  name: string,
  email: string,
  message: string,
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 400)); // Network delay simulation

  const newMessage: ContactMessage = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  mockMessagesStorage.unshift(newMessage); // Add to the top of the pile
  return { success: true, message: "Your message has been sent successfully!" };
};

// 3. Mock GET Route: Simulates pulling messages for Admin
export const mockGetMessages = async (): Promise<{
  success: boolean;
  data: ContactMessage[];
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true, data: [...mockMessagesStorage] };
};
