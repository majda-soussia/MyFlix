import React, { useEffect, useState } from "react";
import "./style/Settings.css";
import { useRef } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"details" | "password">("details");
  const userId = localStorage.getItem("userId");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [showForgotEmail, setShowForgotEmail] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/user.png"); // par défaut
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Récupération des données utilisateur au chargement
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;

        const response = await fetch(`http://localhost:4000/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Erreur lors du fetch");
        }

        const data = await response.json();
        console.log("User data fetched:", data);

        setId(data.id || "");
        setEmail(data.email || "");
        setFirstname(data.firstname || "");
        setLastname(data.lastname || "");
        setPassword(""); // Ne pas afficher le mot de passe dans le champ
        setConfirmPassword("");
        setBirthday(data.birthday || "");
        setGender(data.gender || "");

        if (data.avatar) {
  setAvatarPreview(`http://localhost:4000${data.avatar}`);
}
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur :", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optionnel: vérifier que password et confirmPassword sont identiques avant d'envoyer

    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password, // Envoie le nouveau password, même vide (à adapter selon ton backend)
          birthday,
          gender,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      const updatedUser = await response.json();
      console.log("Utilisateur mis à jour :", updatedUser);
      alert("Utilisateur mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  if (!userId) {
    alert("Utilisateur non identifié.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/users/confirmpassword/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newpassword: password,
        newpasswordComfirm: confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors du changement de mot de passe");
    }

    const result = await response.json();
    alert("Mot de passe changé avec succès !");
    setPassword("");
    setConfirmPassword("");
  } catch (error) {
    alert(error.message);
  }
};

const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file || !userId) return;

  // Affiche une preview
  const reader = new FileReader();
  reader.onloadend = () => {
    setAvatarPreview(reader.result as string);
  };
  reader.readAsDataURL(file);

  // Préparer les données pour upload
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) throw new Error("Erreur lors de l’upload de l’avatar");

    const data = await response.json();
    console.log("Avatar mis à jour :", data);
    alert("Avatar mis à jour !");
  } catch (err) {
    console.error("Erreur upload avatar :", err);
    alert("Échec de l’upload de l’avatar");
  }
};


  return (
    <div>
      <div className="settings-banner" />

      <div className="settings-content">
        <div className="settings-header">
         <div className="avatar-container" onClick={() => fileInputRef.current?.click()} style={{ cursor: "pointer" }}>
          <img
            className="avatar"
            src={avatarPreview}
            alt="User avatar"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </div>

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
          <form className="settings-form" onSubmit={handleSave}>
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                value={firstname}
                placeholder="First name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                value={lastname}
                placeholder="Last name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <div className="form-group full">
              <label>Email</label>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Birthday</label>
              <input
                type="date"
                value={birthday ? new Date(birthday).toISOString().slice(0, 10) : ""}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
  <form className="settings-form" onSubmit={handleChangePassword}>
    <div className="form-group full">
      <label>Old Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="form-group full">
      <label>New Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="form-group full">
      <label>Confirm New Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>

    <a
      href="#"
      className="forgot-password"
      onClick={(e) => {
        e.preventDefault();
        setShowForgotEmail(!showForgotEmail);
      }}
    >
      Forgot Old Password?
    </a>

    {showForgotEmail && (
      <div className="form-group full">
        <label>Enter your email</label>
        <input
          type="email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
    )}

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
