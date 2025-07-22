import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    const query = e.currentTarget.value.trim();
    if (query) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  }
  };
  return (
    <header
      style={{
        background:" linear-gradient(90deg,rgba(64, 8, 10, 1) 0%, rgba(0, 0, 0, 1) 6%, rgba(0, 0, 0, 1) 41%, rgba(0, 0, 0, 1) 51%, rgba(0, 0, 0, 1) 56%, rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 1) 100%)",
        color: "white",
        padding: "20px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0px",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
        MyFlix
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src="/images/profile.png"
          alt="Account"
          title="My Account"
          style={{ width: 24, height: 24, cursor: "pointer" }}
          onClick={() => navigate(`/account/${localStorage.getItem("userId")}`)}
        />
      </div>
    </header>
  );
};

export default Header;
