import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    // Check login state
    const isAuthenticated =
        localStorage.getItem("adminLoggedIn") === "true";

    // Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    // Logged in
    return children;
};

export default ProtectedRoute;