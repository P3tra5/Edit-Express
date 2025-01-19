import React from "react";
import { useDispatch } from "react-redux";
import { updateReservationStatus } from "../../store/reservationsSlice";

const Reservation = ({ reservation, onReport, rowIndex  }) => {
    const dispatch = useDispatch();

    const cancelReservation = (reservationId) => {
        const userConfirmed = window.confirm("Are you sure you want to cancel this reservation?");
        if (userConfirmed) {
            dispatch(updateReservationStatus({ id: reservationId, status: "cancelled" }));
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "active":
                return "bg-green-100 text-green-800";
            case "upcoming":
                return "bg-blue-100 text-blue-800";
            case "completed":
                return "bg-gray-200 text-gray-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    return (
        <>
            <tr
                className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "background"
                } border-b border-gray-300`}
            >
                <td className="px-4 py-2">{new Date(reservation.startDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(reservation.endDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{reservation.purpose}</td>
                <td className="px-4 py-2">{reservation.vehicle.model} ({reservation.vehicle.licensePlate})</td>
                <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(reservation.status)}`}>
                        {reservation.status}
                    </span>
                </td>
                <td className="pr-5 py-2 space-x-2">
                    {reservation.status === "upcoming" && (
                        <button onClick={() => cancelReservation(reservation._id)} title="Cancel" className="text-red-500 font-bold" >⛌</button>
                    )}
                    {reservation.status === "completed" && (
                        <button onClick={() => onReport(reservation)} title="Report">📄</button>
                    )}
                </td>
            </tr>
        </>
    );
};

export default Reservation;