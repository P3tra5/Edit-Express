import React, { useState } from "react";
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
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/dashboard");
                }
            } 
        } catch (error) {
            console.error('Error:', error);
            alert("Login failed!");
        }
    };

    return (
        <div>
            <h1>Prijavite se</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <Link to="/signup">Registriraj se</Link>
        </div>
    );
};

export default LoginPage;