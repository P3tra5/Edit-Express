import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, updateReservationVehicle, updateReservationStatus } from "../../store/reservationsSlice";
import ReservationList from "./ReservationList";

const ManageReservationsPage = () => {
    const dispatch = useDispatch();
    const { reservations, status, error } = useSelector((state) => state.reservations);
    
        useEffect(() => {
            if (status === "idle") {
                dispatch(fetchReservations());
            }
        }, [status, dispatch]);

        const handleUpdateVehicle = (id, vehicle) => {
            dispatch(updateReservationVehicle({ id, vehicle }));
        };        

        const handleUpdateStatus = (id, newStatus) => {
            dispatch(updateReservationStatus({ id, status: newStatus}));
        };

        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold text-primary text-center mb-6"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                    Manage Reservations
                </h1>
                {status === "loading" && <p>Loading reservations...</p>}
                {status === "failed" && <p>Error: {error}</p> /*Error handling*/}
                {status === "succeeded" && (
                    <ReservationList
                        reservations={reservations}
                        onUpdateStatus={handleUpdateStatus}
                        onUpdateVehicle={handleUpdateVehicle}
                    />
                )}
            </div>
        );
    };

export default ManageReservationsPage;