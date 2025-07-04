import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };
  return (
    <header
      style={{
        background: "black",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #333",
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
          onFocus={(e) => (e.target.style.width = "300px")}
          onBlur={(e) => (e.target.style.width = "200px")}
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
          onClick={() => navigate("/account")}
        />
      </div>
    </header>
  );
};

export default Header;
