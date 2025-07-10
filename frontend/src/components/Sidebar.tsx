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
  const navigate = useNavigate();
  const location = useLocation();
  const items: SidebarItemType[] = [
    { label: "WATCH", path: "/", icon: "/images/watch.png", isTitle: true },
    { label: "Home", path: "/", icon: "/images/home.png" },
    { label: "Favourites", path: "/favourites", icon: "/images/favoris.png" },
    { label: "Trending", path: "/trending", icon: "/images/trend.png" },
    { label: "Profile", path: "/profil", icon: "/images/profile.png" },
  ];
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "black",
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
            navigate("/welcome");
          }}
          active={false}
        />
      </div>
    </div>
  );
};

export default Sidebar;
