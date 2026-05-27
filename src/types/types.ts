export type RoomStatus = "FREE" | "FULL";

export interface Room {
  id: number;
  name: string;
  status: RoomStatus;
  createdAt: string;
  updatedAt: string;
}

// handles log in form props
export interface LoginFormProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
  onLoginSuccess: (role: "USER" | "ADMIN") => void;
}

export interface SignUpFormProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}
