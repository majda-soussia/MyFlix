import React from "react";

const SideBarItem = ({ label, icon, onClick, active, isTitle }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 20px",
        cursor: isTitle ? "default" : "pointer",
        backgroundColor: "black" ,
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
