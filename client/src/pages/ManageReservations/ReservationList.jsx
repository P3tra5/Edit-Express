import React from "react";
import Reservation from "./Reservation";

const ReservationList = ({ reservations, onUpdateStatus, onUpdateVehicle }) => {
    /* const sortedReservations = [...reservations].sort(
        (firstReservation, secondReservation) => 
            new Date(firstReservation.startDate) - new Date(secondReservation.startDate)
    ); */
    
    const pendingReservations = reservations
        .filter((reservation) => reservation.status === "pending")
        .sort(
            (firstReservation, secondReservation) =>
                new Date(firstReservation.startDate) - new Date(secondReservation.startDate)
        );

    const otherReservations = reservations
        .filter((reservation) => reservation.status !== "pending")
        .sort(
            (firstReservation, secondReservation) =>
                new Date(secondReservation.endDate) - new Date(firstReservation.endDate)
        );
    const renderTable = (title, data) => (
        <div className="mb-9">
            <h2 className="text-2xl font-semibold text-text mb-2">{title}</h2>
            {data.length > 0 ? (
                <table className="w-full text-left border border-gray-300">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="px-4 py-2">Employee</th>
                            <th className="px-4 py-2">Start Date</th>
                            <th className="px-4 py-2">End Date</th>
                            <th className="px-4 py-2">Purpose</th>
                            <th className="px-4 py-2">Vehicle</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((reservation, index) => (
                            <Reservation
                                key={reservation._id}
                                reservation={reservation}
                                rowIndex={index}
                                onUpdateStatus={onUpdateStatus}
                                onUpdateVehicle={onUpdateVehicle}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No {title.toLowerCase()} reservations</p>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            {renderTable("Waiting for Approval", pendingReservations)}
            {renderTable("Other Reservations", otherReservations)}
        </div>
    );
};

export default ReservationList;