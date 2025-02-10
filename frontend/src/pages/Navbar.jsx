import React, { useState, useContext } from "react";
import "../styles/Navbar.css";
import Logo from "../assets/logo.svg";
import Logout from "../assets/logout.svg";
import Analysis from "../assets/analyse.svg";
import History from "../assets/history.svg";
import { MyContext } from "./MyContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { setNavbarValue } = useContext(MyContext);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
    setNavbarValue(!isOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.href = "/";
    }
  };

  return (
    <div className="navbar">
      <div>
        <img className="navbar-logo" src={Logo} alt="Logo" />
      </div>
      <div className={`navbar-triangle ${isOpen ? "open" : ""}`}></div>
      {isOpen && <div className="navbar-title">Main Menu</div>}
      <div
        className={`navbar-hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleHamburger}
      >
        <span className="humburger1"></span>
        <span className="humburger2"></span>
        <span className="humburger3"></span>
      </div>

      {isOpen && (
        <div>
          <div className="seperator"></div>

          <div className="navbar-links">
            <div className="navbar-link1">
              <img src={Analysis} alt="Logout" className="logout-icon" />
              <a href="/analysis" className="link">
                Analysis
              </a>
            </div>
            <div className="navbar-link2">
              <img src={History} alt="Logout" className="logout-icon" />
              <a href="/history" className="link">
                History
              </a>
            </div>
            <div className="navbar-link3">
              <img src={Logout} alt="Logout" className="logout-icon" />
              <button
                className="sign-out-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <div className="help-instructions"></div> */}
    </div>
  );
};

export default Navbar;
