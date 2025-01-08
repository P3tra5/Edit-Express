import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", { username, email, password });
            if (response.status === 201) {
                const { user } = response.data;
            
                dispatch(loginSuccess({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                }));
            
                navigate("/user/reservations");
            }

            console.log("Korisnik uspješno registriran!");
        } catch (error) {
            console.error('Error:', error);
            alert("Registracija nije uspjela!");
        }
    };

    return (
        <div>
            <h1>Registriraj se</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <button type="submit">Registriraj se</button>
            </form>
        </div>
    );
};

export default SignupPage;