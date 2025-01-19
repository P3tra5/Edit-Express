import './App.css';
import React, { useRef } from "react";
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
    const reservationFormRef = useRef(null);

    const scrollToForm = () => {
        reservationFormRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Navbar onNewReservationClick={scrollToForm} />
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/user/reservations"
                            element={
                                <ProtectedRoute role="user">
                                    <UserReservationsPage reservationFormRef={reservationFormRef} />
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