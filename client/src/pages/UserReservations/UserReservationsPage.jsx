import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import ReservationOverview from "./ReservationsOverview";

const UserReservationsPage = ({ reservationFormRef }) => {
    const [newReservation, setNewReservation] = useState(null);

    const handleReservationCreated = (reservation) => {
        setNewReservation(reservation);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mt-8">
                <ReservationOverview />
            </div>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div ref={reservationFormRef}>
                    <ReservationForm onReservationCreated={handleReservationCreated} />
                </div>
                {newReservation && (
                    <div className="bg-green-100 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">New Reservation Created</h2>
                        <p>{newReservation.purpose}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserReservationsPage;