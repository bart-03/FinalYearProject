import React, { useState, useEffect } from "react";
import "../styles/Analysis.css";

const Analysis = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8080/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="analysis">
      <h1>Analysis</h1>
    </div>
  );
};

export default Analysis;
