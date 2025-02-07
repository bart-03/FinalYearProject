import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== "/" && <Navbar />}
            <Outlet />  {/* This renders the current route's component */}
        </div>
    );
};

export default Layout;