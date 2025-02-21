// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/SignIn.css";
// import Logo from "../assets/logo.svg";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const isEmailValid = (email) => {
//     // Simple regex for validating email
//     const emailRegex = /^[^\s@]+@[^\s@]+$/;

//     return emailRegex.test(email);
//   };

//   const isPasswordValid = (password) => {
//     // Ensure password is at least 8 characters long
//     return password.length >= 1;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate email and password
//     if (!isEmailValid(email)) {
//       setError("Invalid email format.");
//       return;
//     }
//     if (!isPasswordValid(password)) {
//       setError("Password must be at least 1 characters long.");
//       return;
//     }

//     // Clear any previous error
//     setError("");

//     axios
//       .post("http://localhost:8080/SignIn", { email, password })
//       .then((response) => {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user_id", response.data.user_id);
//         console.log(response.data);
//         window.location.reload();
//       })
//       .catch((err) => {
//         console.error("Error signing in:", err);
//         setError("Failed to sign in. Please check your credentials.");
//       });
//   };

//   return (
//     <div className="sign-in">
//       <div className="left-container">
//         <img src={Logo} alt="Logo" className="logo" />
//       </div>
//       <div className="sign-in-box">
//         <form
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             position: "relative",
//           }}
//         >
//           <label className="signin-label" htmlFor="email">Email</label>
//           <input
//             className="input-email"
//             type="email"
//             name="email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label className="signin-label"htmlFor="password">Password</label>
//           <input
//             className="input-password"
//             type="password"
//             name="password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <button
//             className="button-singin"
//             onClick={handleSubmit}
//             type="submit"
//           >
//             Sign In
//           </button>
//         </form>
//         <h3 className="contact-info">For an account reach out to contact@XDetect.com</h3>
//       </div>

//       <h4>App created by BC</h4>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import axios from "axios";
import "../styles/SignIn.css";
import Logo from "../assets/logo.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEmailValid = (email) => {
    // Simple regex for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Ensure password is at least 8 characters long
    return password.length >= 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email and password
    if (!isEmailValid(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!isPasswordValid(password)) {
      setError("Password must be at least 1 characters long.");
      return;
    }

    // Clear any previous error
    setError("");

    axios
      .post("http://localhost:8080/SignIn", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error signing in:", err);
        setError("Failed to sign in. Please check your credentials.");
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="sign-in">
      <div className="left-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="sign-in-box">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <label className="signin-label" htmlFor="email">
            Email
          </label>
          <input
            className="input-email"
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="signin-label" htmlFor="password">
            Password
          </label>
          <input
            className="input-password"
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            className="button-singin"
            onClick={handleSubmit}
            type="submit"
          >
            Sign In
          </button>
        </form>
        <h3 className="contact-info">For an account reach out to contact@XDetect.com</h3>

        {/* About XDetect link */}
        <div className="about-link" onClick={openModal} >
          About XDetect
        </div>
      </div>

      <h4>App created by BC</h4>

      
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>About XDetect</h2>
      <p>
        XDetect is an advanced platform designed to detect diseases of the thorax from X-ray images, aiming to significantly reduce bias and errors in radiology. By leveraging multiple trained machine learning models, the system enhances the accuracy of diagnoses, providing radiologists with reliable insights for better decision-making. XDetect uses state-of-the-art image recognition technologies to analyze X-ray images and identify signs of disease that might be overlooked in traditional methods.
      </p>
      <br />
      <p>
        In addition to its image analysis capabilities, XDetect incorporates clinical data input, which is processed by a powerful large language model (LLM). This allows for comprehensive assessment and interpretation of the clinical context alongside the X-ray data. By combining these approaches, XDetect aids healthcare professionals in delivering more precise diagnoses and improving patient outcomes, ensuring that all available information is considered in the diagnostic process.
      </p>
      <button className="button-about" onClick={closeModal}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default SignIn;

