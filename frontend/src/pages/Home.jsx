import React, { useState, useEffect } from "react";
const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8080/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <h1>{message}</h1>;
};

export default Home;
