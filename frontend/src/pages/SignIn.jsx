import React, { useState } from "react";
import "../styles/SignIn.css";

const SignIn = () => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <div className="sign-in">
      <div className="left-container">
        <img></img>
      </div>
      <div className="sign-in-box">
        <form
          action=""
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input type="email" />
          <label htmlFor="password">Password</label>
          <input type="password" />
          <button type="submit">Sign In</button>
        </form>
        <h3>For an account reach out to contact@XDetect.com</h3>
      </div>

      <h4>App created by BC</h4>
    </div>
  );
};

export default SignIn;
