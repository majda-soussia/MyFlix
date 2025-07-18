import React, { useEffect, useState } from "react";
import "./style/Settings.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const { id } = useParams(); // get user ID from URL
const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"details" | "password">("details");

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");

const handleCancel = () => {
  navigate("/home");
};

useEffect(() => {

  if (!id) return;
  fetch(`http://localhost:4000/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    })
    .then((data) => {
      setEmail(data.email || "");
      setFirstname(data.firstname || "");
      setLastname(data.lastname || "");
setBirthday(data.birthday ? data.birthday.slice(0, 10) : "");
      setGender(data.gender || "");
    })
.catch((err) => {
  console.error("Fetch error:", err.message || err);
});
}, [id]);


  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return alert("User ID missing");

    try {
      const res = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname ,
          lastname,
          email,
          birthday,
          gender,
        }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      alert("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert(" An error occurred. Please try again.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return alert("User ID missing");

    if (!password || !confirmPassword) {
      return alert("Please enter and confirm your new password.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await fetch(`http://localhost:4000/api/users/confirmpassword/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newpassword: password,
          newpasswordComfirm: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`${data.error || data}`);
      } else {
        alert("Password updated successfully!");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error changing password:", error); 
      alert("An error occurred while changing password.");
    }
  };

  if (!id) return <p>User ID is missing.</p>;

  return (
    <div>
      <div className="settings-banner" />

      <div className="settings-content">
        <div className="settings-header">
          <img className="avatar" src="/images/user.png" alt="User avatar" />
          <h2>Settings</h2>
        </div>

        <div className="settings-tabs">
          <button
            className={`tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            My details
          </button>
          <button
            className={`tab ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
        </div>

        {activeTab === "details" && (
          <form className="settings-form" onSubmit={handleDetailsSubmit}>
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="form-group full">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Birthday</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-buttons">
            <button className="btn cancel"
             onClick={handleCancel}>Cancel</button>

              <button type="submit" className="btn save">
                Save
              </button>
            </div>
          </form>
        )}

        {activeTab === "password" && (
          <form className="settings-form" onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-buttons">
              <button
                type="button"
                className="btn cancel"
                onClick={() => {
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn save">
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
