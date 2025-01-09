// import React, { useState, useEffect } from "react";
// import './App.css';
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";

// import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
// import Navbar from "./pages/Navbar"; 

// function App() {
    
  
  
//   const [message, setMessage] = useState("");
//     useEffect(() => {
//         fetch("http://127.0.0.1:8080/")
//             .then((response) => response.json())
//             .then((data) => setMessage(data.message));
//     }, []);

//      // Use useLocation to get the current path
//      const location = useLocation();
//     return (
    
//         <Router>
//             <div>
//                 {/* <Navbar />  */}
//                 {location.pathname !== "/sign-in" && <Navbar />}
//                 <Routes>
//                     <Route path="/" element={<SignIn />} />
//                     <Route path="/Home" element={Home} />
                   
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;

import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Layout from "./pages/Layout"; // New Layout component

function App() {
   
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    

    return (
        <Router>
            <Routes>
                {/* Wrap everything in the Layout component */}
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <SignIn />} />
                    <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
                   
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
