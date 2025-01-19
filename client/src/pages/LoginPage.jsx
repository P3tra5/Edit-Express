import React, { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { email, password }, { withCredentials: true });

            if (response.status === 200) {
                const { user } = response.data;

                dispatch(loginSuccess({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                }));

                if (user.role === "admin") {
                    navigate("/admin/manage-reservations");
                } else {
                    navigate("/user/reservations");
                }
            } 
        } catch (error) {
            console.error('Error:', error);
            alert("Login failed!");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f8ff]">
            {/* Logo and Title */}
            <div className="flex items-center mb-8">
                <img src={logo} alt="logo" className="w-16 h-16 object-cover mr-4" />
                <div
                    className="text-left text-5xl font-bold text-primary leading-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                    Fleet
                    <br />
                    Management
                </div>
            </div>
    
            {/* Login Form */}
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-accent text-white p-3 rounded-md hover:bg-secondary-dark transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};    

export default LoginPage;