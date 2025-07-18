import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarItem from "./SideBarItem.tsx";
type SidebarItemType = {
  label: string;
  path?: string;
  icon: string;
  isTitle?: boolean;
};
export const Sidebar: React.FC = ()  => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();
  const items: SidebarItemType[] = [
    { label: "WATCH", path: "/", icon: "/images/watch.png", isTitle: true },
    { label: "Home", path: "/", icon: "/images/home.png" },
    { label: "Favourites", path: "/favourites", icon: "/images/favoris.png" },
    { label: "Trending", path: "/trending", icon: "/images/trend.png" },
    { label: "Profile", path: `/account/${userId}`, icon: "/images/profile.png" },
  ];
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: " linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 6%, rgba(0, 0, 0, 1) 41%, rgba(0, 0, 0, 1) 51%, rgba(0, 0, 0, 1) 56%, rgba(0, 0, 0, 1) 94%, rgba(74, 13, 13, 1) 100%)",
        padding: "60px 0",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
      {items.map(({ label, path, icon, isTitle }) => (
        <SidebarItem
          key={path ?? label}
          label={label}
          icon={icon}
          isTitle={isTitle}
          onClick={() => {if (!isTitle && path) navigate(path);}}
          active={location.pathname === path}
        />
      ))}
      </div>
      <div style={{ paddingBottom: "20px" }}>
      <SidebarItem
          label="Logout"
          icon="/images/logout.png"
          onClick={() => {
            navigate("/login");
          }}
          active={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;
