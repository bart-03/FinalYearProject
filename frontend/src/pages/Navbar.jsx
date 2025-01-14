// // import Logo from "../assets/logo.svg";
// // import React, { useState, useEffect } from "react";
// // import "../styles/Navbar.css";

// // const Navbar = () => {
// //   return (
// //     <div className="navbar">
// //       <div>
// //         <img className="navbar-logo" src={Logo}></img>
// //       </div>
// //       <div className="navbar-triangle"></div>
// //       <div className="navbar-hamburger">
// //         <span className="humburger1"></span>
// //         <span className="humburger2"></span>
// //         <span className="humburger3"></span>
// //       </div>
// //       <div>
// //         <h1>tooltip</h1>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;

// import React, { useState } from "react";
// import "../styles/Navbar.css";
// import Logo from "../assets/logo.svg";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleHamburger = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="navbar">
//       <div>
//         <img className="navbar-logo" src={Logo} alt="Logo" />
//       </div>
//       <div className={`navbar-triangle ${isOpen ? "open" : ""}`}></div>
//       <div
//         className={`navbar-hamburger ${isOpen ? "open" : ""}`}
//         onClick={toggleHamburger}
//       >
//         <span className="humburger1"></span>
//         <span className="humburger2"></span>
//         <span className="humburger3"></span>
//       </div>
//       {isOpen && (
//         <div className="navbar-links">
//           <a href="/analysis" className="link">
//             Analysis
//           </a>
//           <a href="/history" className="link">
//             History
//           </a>
//           <a
//             href="/"
//             className="link"
//             onClick={() => localStorage.removeItem("token")}
//           >
//             Sign Out
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import "../styles/Navbar.css";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to the home page
    }
  };

  return (
    <div className="navbar">
      <div>
        <img className="navbar-logo" src={Logo} alt="Logo" />
      </div>
      <div className={`navbar-triangle ${isOpen ? "open" : ""}`}></div>
      <div
        className={`navbar-hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleHamburger}
      >
        <span className="humburger1"></span>
        <span className="humburger2"></span>
        <span className="humburger3"></span>
      </div>
      {isOpen && (
        <div className="navbar-links">
          <a href="/analysis" className="link">
            Analysis
          </a>
          <a href="/history" className="link">
            History
          </a>
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
      )}
      <div className="help-instructions"></div>
    </div>
  );
};

export default Navbar;
