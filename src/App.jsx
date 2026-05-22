import React from "react";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

    return (

        <Routes>

            {/* Login */}
            <Route
                path="/"
                element={<Login />}
            />

            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Redirect */}
            <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>

    );
};

export default App;