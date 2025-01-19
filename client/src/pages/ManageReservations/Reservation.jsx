import React, { useState } from "react";
import VehicleDropdown from "../../components/VehicleDropdown";

const Reservation = ({ reservation, rowIndex, onUpdateStatus, onUpdateVehicle  }) => {
    const [selectedVehicle, setSelectedVehicle] = useState(reservation.vehicle._id);

    const handleVehicleChange = async (vehicleId) => {
        try {
            await onUpdateVehicle(reservation._id, vehicleId);
            setSelectedVehicle(vehicleId);
        } catch (error) {
            console.error("Failed to update vehicle:", error);
        }
    };

    const handleApprove = () => {
        onUpdateStatus(reservation._id, "upcoming");
    };

    const handleReject = () => {
        onUpdateStatus(reservation._id, "rejected");
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
            case "rejected":
                return "bg-red-100 text-red-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
        }
    };

    return (
        <tr
            className={`${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
            } border-b border-gray-300`}
        >
            <td className="px-4 py-2">{reservation.employee.username}</td>
            <td className="px-4 py-2">{new Date(reservation.startDate).toLocaleDateString()}</td>
            <td className="px-4 py-2">{new Date(reservation.endDate).toLocaleDateString()}</td>
            <td className="px-4 py-2">{reservation.purpose}</td>
            <td className="px-4 py-2">
                {reservation.status === "upcoming" || reservation.status === "pending" ? (
                    <VehicleDropdown
                        selectedVehicle={selectedVehicle}
                        onVehicleSelect={handleVehicleChange}
                    />
                ) : (
                    `${reservation.vehicle.model} (${reservation.vehicle.licensePlate})`
                )}
            </td>
            <td className="px-4 py-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(reservation.status)}`}>
                    {reservation.status}
                </span>
            </td>
            <td className="px-2 py-2 space-x-2">
                {reservation.status === "pending" && (
                    <>
                        <button
                            onClick={handleApprove}
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                        >
                            Approve
                        </button>
                        <button
                            onClick={handleReject}
                            className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Reject
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default Reservation;