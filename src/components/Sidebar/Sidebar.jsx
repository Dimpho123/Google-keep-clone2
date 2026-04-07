import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, setView }) => {
  const [activeItem, setActiveItem] = useState("Notes");

  const menuItems = [
    { icon: "lightbulb", label: "Notes" },
    { icon: "notifications", label: "Reminders" },
    { icon: "edit", label: "Edit Labels" },
    { icon: "archive", label: "Archive" },
    { icon: "delete", label: "Trash" }
  ];

  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`sidebar-item ${
            activeItem === item.label ? "active" : ""
          }`}
          onClick={() => {
            setActiveItem(item.label); // 👈 highlight selected
            setView(item.label);       // 👈 change page
          }}
        >
          <span className="material-symbols-outlined hover">
            {item.icon}
          </span>

          <span className="sidebar-text">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;