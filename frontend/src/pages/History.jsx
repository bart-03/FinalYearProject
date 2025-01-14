import React, { useState, useEffect } from "react";
import "../styles/History.css";

const History = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8080/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="history">
      <h1>History</h1>
    </div>
  );
};

export default History;
