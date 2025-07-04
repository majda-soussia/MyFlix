import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarItem from "./SideBarItem";
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    { label: "WATCH", path: "/", icon: "/images/watch.png", isTitle: true },
    { label: "Home", path: "/", icon: "/images/home.png" },
    { label: "Favourites", path: "/favourites", icon: "/images/favoris.png" },
    { label: "Trending", path: "/trending", icon: "/images/trend.png" },
  ];
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "black",
        padding: "20px 0",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
      {items.map(({ label, path, icon, isTitle }) => (
        <SidebarItem
          key={path}
          label={label}
          icon={icon}
          isTitle={isTitle}
          onClick={() => !isTitle && navigate(path)}
          active={location.pathname === path}
        />
      ))}
      </div>
      <div style={{ paddingBottom: "20px" }}>
        <SidebarItem
          label="Logout"
          icon="/images/logout.png"
          onClick={() => {
            navigate("/welcome");
          }}
          active={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;
