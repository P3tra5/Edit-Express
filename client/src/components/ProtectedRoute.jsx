import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, role: userRole } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && userRole !== role) {
        alert("Zabranjen pristup!");

        const previousPath = location.state?.from?.pathname || "/";
        return <Navigate to={previousPath} replace />;
    }

    return children;
};

export default ProtectedRoute;