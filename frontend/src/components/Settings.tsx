import React, { useEffect, useState } from "react";
import "./style/Settings.css";
import { users } from "../data/users.ts";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"details" | "password">("details");

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  useEffect(() => {
    const currentUser = users[1];
    setEmail(currentUser.email);
    setFirstname(currentUser.firstname);
    setLastname(currentUser.lastname);
    setPassword(currentUser.password);
    setConfirmPassword(currentUser.password);
    setBirthday(currentUser.birthday);
    setGender(currentUser.gender);
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user:", {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      birthday,
      gender,
    });
  };

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
          <form className="settings-form">
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
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="form-group full">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setFirstname(e.target.value)}
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
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="button" className="btn cancel">
                Cancel
              </button>
              <button type="submit" className="btn save">
                Save
              </button>
            </div>
          </form>
        )}
        {activeTab === "password" && (
          <form
            className="settings-form"
            onSubmit={(e) => {
              e.preventDefault();
              // handle password update logic here
              console.log("Password changed:", { password, confirmPassword });
            }}
          >
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
              <button type="button" className="btn cancel">
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
