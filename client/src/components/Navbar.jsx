import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    return (
        <nav>
            {!isAuthenticated ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            ) : role === "user" ? (
                <Link to="/user/reservations">Moje Rezervacije</Link>
            ) : role === "admin" ? (
                <>
                    <Link to="/admin/manage-reservations">Rezervacije</Link>
                    <Link to="/admin/handle-issues">Problemi</Link>
                    <Link to="/admin/vehicle-tracking">Vozila</Link>
                </>
            ) : null}
        </nav>
    );
};

export default Navbar;