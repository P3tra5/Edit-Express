import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations } from "../../store/reservationsSlice";
import ReservationList from "./ReservationList";
import IssueReport from "./IssueReport";

const ReservationOverview = () => {
    const dispatch = useDispatch();
    const { reservations, status, error } = useSelector((state) => state.reservations);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserReservations());
        }
    }, [status, dispatch]);

    const handleReport = (reservation) => {
        setSelectedReservation(reservation);
    };

    const closeReport = () => {
        setSelectedReservation(null);
    };

    return (
        <div>
            <h1
                className="text-3xl font-bold text-primary text-center mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                Reservations
            </h1>
            {status === "loading" && <p>Loading reservations...</p>}
            {status === "failed" && <p>Error: {error}</p> /* Error handling */}
            {status === "succeeded" && <ReservationList reservations={reservations} onReport={handleReport} />}
            {selectedReservation && (
                <IssueReport
                    reservation={selectedReservation}
                    onClose={closeReport}
                />
            )}
        </div>
    );
};

export default ReservationOverview;