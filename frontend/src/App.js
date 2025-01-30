import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Analysis from "./pages/Analysis";
import SignIn from "./pages/SignIn";
import History from "./pages/History";
import Layout from "./pages/Layout"; // New Layout component
import { MyProvider } from "./pages/MyProvider";

function App() {
   
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

   const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);
    

    return (
        <MyProvider>
        <Router>
            <Routes>
                {/* Wrap everything in the Layout component */}
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/analysis" /> : <SignIn />} />
                    <Route path="/analysis" element={isAuthenticated ? <Analysis /> : <Navigate to="/" />} />
                    <Route path="/history" element={<History />} />
                   
                </Route>
            </Routes>
        </Router>
        </MyProvider>
    );
}

export default App;
