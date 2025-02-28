import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faComments,
  faUser,
  faBook,
  faDoorOpen,
  faDoorClosed,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sabit Logo Çubuğu */}
      <div className="logo-bar">
        <div className="logo-container">
          <h1 className="logo-text">Anime Sözlük</h1>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* Açılır-Kapanır Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Link to="/" className="menu-link">
              <FontAwesomeIcon icon={faHome} />
              <span>Ana Sayfa</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/anime" className="menu-link">
              <FontAwesomeIcon icon={faBook} />
              <span>Anime Listeleri</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/chat" className="menu-link">
              <FontAwesomeIcon icon={faComments} />
              <span>Chat Odaları</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/profile" className="menu-link">
              <FontAwesomeIcon icon={faUser} />
              <span>Profilim</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/login" className="menu-link">
              <FontAwesomeIcon icon={faDoorOpen} />
              <span>Giriş</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/register" className="menu-link">
              <FontAwesomeIcon icon={faDoorClosed} />
              <span>Giriş</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
