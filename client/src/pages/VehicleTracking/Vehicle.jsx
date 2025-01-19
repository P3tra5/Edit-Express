import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateVehicleInspectionDate, updateVehicleStatus } from "../../store/vehiclesSlice";

const Vehicle = ({ vehicle, rowIndex }) => {
    const dispatch = useDispatch();
    const [inspectionDate, setInspectionDate] = useState(vehicle.inspectionDate ? vehicle.inspectionDate.split("T")[0] : "");
    const [status, setStatus] = useState(vehicle.status);

    const handleInspectionDateChange = (e) => {
        const newDate = e.target.value;
        setInspectionDate(newDate);
        dispatch(updateVehicleInspectionDate({ id: vehicle._id, inspectionDate: newDate }));
    };

    const handleStatusChange = async (newStatus) => {
        try {
            setStatus(newStatus);
            await dispatch(updateVehicleStatus({ id: vehicle._id, status: newStatus })).unwrap();
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case "available":
                return "bg-green-100 text-green-800";
            case "unavailable":
                return "bg-red-100 text-red-800";
            case "in maintenance":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    return (
        <tr className={`${rowIndex % 2 === 0 ? "bg-white" : "background"} border-b border-gray-300`}>
            <td className="px-4 py-2">{vehicle.model}</td>
            <td className="px-4 py-2">{vehicle.licensePlate}</td>
            <td className="px-4 py-2">{vehicle.type}</td>
            <td className="px-4 py-2">
                <input
                    type="date"
                    value={inspectionDate}
                    onChange={handleInspectionDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="border border-gray-300 rounded px-2 py-1"
                />
            </td>
            <td className="px-4 py-2">
                <select
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`border border-gray-300 rounded px-2 py-1 ${statusColor(status)}`}
                >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="in maintenance">In Maintenance</option>
                </select>
            </td>
        </tr>
    );
};

export default Vehicle;