import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../pages/Navbar"; // Import Navbar
import { Outlet } from "react-router-dom"; // To render nested routes

const Layout = () => {
    const location = useLocation(); // Get the current route

    return (
        <div>
            {/* Only show Navbar if the current route is not "/sign-in" */}
            {location.pathname !== "/" && <Navbar />}
            <Outlet />  {/* This renders the current route's component */}
        </div>
    );
};

export default Layout;