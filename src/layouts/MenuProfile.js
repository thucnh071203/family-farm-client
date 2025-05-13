import React, { useState } from "react";
import "../styles/menuProfile.css";

export const MenuProfile = () => {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng popup

  // Hàm xử lý việc mở/đóng popup
  const togglePopupMenuProfile = () => {
    setIsOpen(!isOpen); // Đảo trạng thái popup
  };

  return (
    <div>
      <button className="open-popup-btn" onClick={togglePopupMenuProfile}>
        Mở Menu Profile
      </button>

      <div className={`popup-overlay ${isOpen ? "active" : ""}`} id="popup">
        <div className="menu-card">
          <div className="close-btn" onClick={togglePopupMenuProfile}>
            &times;
          </div>

          <div className="menu-grid">
            <a href="#profile" className="menu-item">
              <i className="fas fa-user"></i>Your Profile
            </a>
            <a href="#payment" className="menu-item">
              <i className="fab fa-amazon-pay"></i>Payment
            </a>
            <a href="#setting" className="menu-item">
              <i className="fas fa-cog"></i>Setting
            </a>
            <a href="#professional" className="menu-item">
              <i className="fas fa-plus"></i>Profesional
            </a>
            <a href="#service" className="menu-item">
              <i className="fas fa-concierge-bell"></i>Your Service
            </a>
          </div>

          <button className="logout-btn">
            <i className="fas fa-power-off"></i>Logout
          </button>
        </div>
      </div>
    </div>
  );
};
