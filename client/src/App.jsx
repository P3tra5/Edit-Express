import './App.css'
import React from "react";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from './store/store';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import UserReservationsPage from './pages/UserReservations/UserReservationsPage';
import ManageReservationsPage from './pages/ManageReservations/ManageReservationsPage';
import VehicleTrackingPage from './pages/VehicleTracking/VehicleTrackingPage';
import HandleIssuesPage from './pages/HandleIssues/HandleIssuesPage';

const App = () => {
    return (
        <Provider store = {store}>
            <PersistGate loading={null} persistor={persistor}>
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
            </PersistGate>
        </Provider>
    );
};

export default App;