import React from "react";
import {
  mockGetUserProfile,
  mockChangePassword,
  mockDeleteAccount,
  mockUpdateUserProfile,
} from "../services/auth.service";
import type { UserProfile } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loadingInitial, setLoadingInitial] = React.useState(true);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const [isSaving, setIsSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const response = await mockGetUserProfile();
      if (response.success && response.data) {
        setProfile(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      } else {
        setMessage({
          type: "error",
          text: "Failed to load profile. Please try again.",
        });
      }
      setLoadingInitial(false);
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    const response = await mockUpdateUserProfile({
      firstName,
      lastName,
      email,
    });
    if (response.success) {
      setMessage({ type: "success", text: response.message });
      setProfile((prev) =>
        prev ? { ...prev, firstName, lastName, email } : null,
      );
    }
    setIsSaving(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;

    setIsSaving(true);
    const response = await mockChangePassword(newPassword);
    if (response.success) {
      setMessage({ type: "success", text: response.message });
      setNewPassword("");
    }
    setIsSaving(false);
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    setIsSaving(true);
    const response = await mockDeleteAccount();
    if (response.success) {
      localStorage.removeItem("authToken");
      alert(
        "Your account has been deleted. You will be redirected to the homepage.",
      );
      navigate("/");
      window.location.reload();
    }
    setIsSaving(false);
  };

  if (loadingInitial) {
    return <div className="profile-container">Loading profile...</div>;
  }
  if (!profile) {
    return (
      <div className="profile-container">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="role-badge">
        Account Role: <strong>{profile.role.toUpperCase()}</strong>
      </div>

      {message && (
        <div className={`message-box ${message.type}`}>{message.text}</div>
      )}

      <div className="profile-grid">
        <div className="profile-card">
          <h3>Personal Information</h3>
          <form onSubmit={handleUpdateProfile}>
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="save-btn" disabled={isSaving}>
              Save Changes
            </button>
          </form>
        </div>

        <div className="profile-card">
          <h3>Security</h3>
          <form onSubmit={handleChangePassword}>
            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <button type="submit" className="save-btn" disabled={isSaving}>
              Update Password
            </button>
          </form>
        </div>

        <div className="profile-card danger-zone">
          <h3>Delete Account</h3>
          <p>Deleting your account will permanently remove all your data.</p>
          <button
            type="button"
            className="delete-btn"
            onClick={handleDeleteAccount}
            disabled={isSaving}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
