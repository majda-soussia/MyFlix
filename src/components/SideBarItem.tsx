import React from "react";
type SidebarItemProps = {
  label: string,
  icon: string,
  onClick: () => void,
  active: boolean,
  isTitle?: boolean,
};
const SideBarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  onClick,
  active,
  isTitle = false,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 20px",
        cursor: isTitle ? "default" : "pointer",
        backgroundColor: " linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 6%, rgba(0, 0, 0, 1) 41%, rgba(0, 0, 0, 1) 51%, rgba(0, 0, 0, 1) 56%, rgba(0, 0, 0, 1) 94%, rgba(74, 13, 13, 1) 100%)",
        color: "white",
        fontWeight: active ? "bold" : "normal",
        justifyContent: isTitle ? "center" : "flex-start",
        textTransform: isTitle ? "uppercase" : "none",
        fontSize: isTitle ? "1.2rem" : "1rem",
        marginBottom: isTitle ? "20px" : "0",
      }}
    >
      <img
        src={icon}
        alt={label}
        style={{ width: 24, height: 24, marginRight: 10 }}
      />
      <span> {label}</span>
    </div>
  );
};

export default SideBarItem;
