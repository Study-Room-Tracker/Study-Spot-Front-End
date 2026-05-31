import React from "react";
import { updateUserProfile } from "../services/auth.service";
import type { UserProfile } from "../services/auth.service";

const ProfilePage = () => {
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
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as UserProfile;
      setProfile(parsedUser);
      setFirstName(parsedUser.firstName || "");
      setLastName(parsedUser.lastName || "");
      setEmail(parsedUser.email || "");
    }
    setLoadingInitial(false);
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    const response = await updateUserProfile({
      firstName,
      lastName,
      email,
    });
    if (response.success) {
      setMessage({
        type: "success",
        text: response.message || "Profile updated successfully.",
      });
      setProfile((prev) => (prev ? { ...prev, ...response.data } : null));
    } else {
      setMessage({
        type: "error",
        text: response.message || "Failed to update profile changes.",
      });
    }
    setIsSaving(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;

    setIsSaving(true);
    const response = await updateUserProfile({ password: newPassword });
    if (response.success) {
      setMessage({
        type: "success",
        text: response.message || "Password updated successfully.",
      });
      setNewPassword("");
    } else {
      setMessage({
        type: "error",
        text: response.message || "Failed to update password.",
      });
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
      </div>
    </div>
  );
};
export default ProfilePage;
