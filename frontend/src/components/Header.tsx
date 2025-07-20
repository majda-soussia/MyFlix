import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = e.currentTarget.value.trim();
      if (query) {
        navigate(`/search?q=${encodeURIComponent(query)}`);
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
        <input
          type="text"
          placeholder="Search..."
          onKeyDown={handleSearch}
          style={{
            backgroundColor: "transparent",
            color: "white",
            fontSize: "16px",
            border: "1px solid #555",
            borderRadius: "4px",
            padding: "6px 10px",
            outline: "none",
            width: "200px",
            transition: "width 0.3s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.width = "300px")}
          onBlur={(e) => (e.currentTarget.style.width = "200px")}
        />

        <img
          src="/images/search.png"
          alt="search"
          title="search"
          style={{ width: 24, height: 24, cursor: "pointer" }}
          onClick={() => navigate("/search")}
        />
        <img
          src="/images/favoris.png"
          alt="Favorites"
          title="Favorites"
          style={{ width: 24, height: 24, cursor: "pointer" }}
          onClick={() => navigate("/favourites")}
        />
        <img
          src="/images/profile.png"
          alt="Account"
          title="My Account"
          style={{ width: 24, height: 24, cursor: "pointer" }}
          onClick={() => navigate("/account/:id")}
        />
      </div>
    </header>
  );
};

export default Header;
