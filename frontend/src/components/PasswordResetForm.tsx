import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PasswordResetPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // get user ID from URL

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/users/confirmpassword/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newpassword: newPassword, newpasswordComfirm: confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Password updated successfully. Redirecting to login...");
        navigate("/login"); // redirect to login
      } else {
        setError("❌ " + data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="password-reset-form">
      <div>
        <label htmlFor="new-password">New Password:</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>

      <div>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Reset Password</button>
    </form>
  );
};

export default PasswordResetPage;
