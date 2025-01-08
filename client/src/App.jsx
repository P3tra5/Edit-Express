import './App.css'
import React from "react";
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import UserReservationsPage from './pages/UserReservationsPage';
import ManageReservationsPage from './pages/ManageReservationsPage';
import VehicleTrackingPage from './pages/VehicleTrackingPage';
import HandleIssuesPage from './pages/HandleIssuesPage';

const App = () => {
    return (
        <Provider store = {store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/user/reservations"
                        element={
                            <ProtectedRoute role="user">
                                <UserReservationsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/manage-reservations"
                        element={
                            <ProtectedRoute role="admin">
                                <ManageReservationsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/vehicle-tracking"
                        element={
                            <ProtectedRoute role="admin">
                                <VehicleTrackingPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/handle-issues"
                        element={
                            <ProtectedRoute role="admin">
                                <HandleIssuesPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;