import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SignIn.css";
import Logo from "../assets/logo.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/SignIn", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data[1]);
        console.log(response.data);
        window.location.reload();
      });
  };

  return (
    <div className="sign-in">
      <div className="left-container">
        <img src={Logo}></img>
      </div>
      <div className="sign-in-box">
        <form
          action=""
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="button-singin"
            onClick={handleSubmit}
            type="submit"
          >
            Sign In
          </button>
        </form>
        <h3>For an account reach out to contact@XDetect.com</h3>
      </div>

      <h4>App created by BC</h4>
    </div>
  );
};

export default SignIn;
