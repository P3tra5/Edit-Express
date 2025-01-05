import './App.css'
import React from "react";
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

const App = () => {
    return (
        <Provider store = {store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    {/*<Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;