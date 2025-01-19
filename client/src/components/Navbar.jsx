import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/authSlice";
import { resetState } from "../store/actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetState()); 
    };

    return (
        <nav className="bg-white text-text shadow-md dark:bg-background-dark dark:text-text-dark">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary dark:hover:text-secondary-dark underline"
                                : "text-primary dark:hover:text-secondary-dark"
                        } //
                    >
                        Fleet Management
                    </NavLink>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-4">
                    {!isAuthenticated ? (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "hover:underline hover:text-secondary dark:hover:text-secondary-dark underline"
                                        : "hover:underline hover:text-secondary dark:hover:text-secondary-dark"
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    isActive
                                        ? "hover:underline hover:text-secondary dark:hover:text-secondary-dark underline"
                                        : "hover:underline hover:text-secondary dark:hover:text-secondary-dark"
                                }
                            >
                                Signup
                            </NavLink>
                        </>
                    ) : role === "user" ? (
                        <>
                            <button
                                onClick={handleLogout}
                                className="bg-accent text-white px-4 py-2 rounded-md transition hover:bg-accent-dark dark:bg-accent-dark dark:hover:bg-accent"
                            >
                                New Reservation
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-primary px-4 py-2 rounded-md transition hover:bg-secondary dark:bg-accent-dark dark:hover:bg-accent border border-primary"
                            >
                                ↪ Logout
                            </button>
                        </>
                    ) : role === "admin" ? (
                        <>
                            <NavLink
                                to="/admin/manage-reservations"
                                className={({ isActive }) =>
                                    isActive
                                        ? "hover:underline hover:text-secondary dark:hover:text-secondary-dark underline"
                                        : "hover:underline hover:text-secondary dark:hover:text-secondary-dark"
                                }
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                                Reservations
                            </NavLink>
                            <NavLink
                                to="/admin/vehicle-tracking"
                                className={({ isActive }) =>
                                    isActive
                                        ? "hover:underline hover:text-secondary dark:hover:text-secondary-dark underline"
                                        : "hover:underline hover:text-secondary dark:hover:text-secondary-dark"
                                }
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                                Vehicles
                            </NavLink>
                            <NavLink
                                to="/admin/handle-issues"
                                className={({ isActive }) =>
                                    isActive
                                        ? "hover:underline hover:text-secondary dark:hover:text-secondary-dark underline"
                                        : "hover:underline hover:text-secondary dark:hover:text-secondary-dark"
                                }
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                                Reports
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-primary px-4 py-2 rounded-md transition hover:bg-secondary dark:bg-accent-dark dark:hover:bg-accent border border-primary"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                                ↪ Logout
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;