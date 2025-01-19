import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReservation } from "../../store/reservationsSlice";
import VehicleDropdown from "../../components/VehicleDropdown";

const ReservationForm = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [purpose, setPurpose] = useState("");
    const [vehicle, setVehicle] = useState("");
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.reservations);
    
    const handleVehicleSelect = (selectedVehicle) => {
        setVehicle(selectedVehicle);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservationData = { startDate, endDate, purpose, vehicle };

        try {
            const resultAction = await dispatch(createReservation(reservationData));
            if (createReservation.fulfilled.match(resultAction)) {
                setStartDate("");
                setEndDate("");
                setPurpose("");
                setVehicle("");
            } else if (createReservation.rejected.match(resultAction)) {
                console.error("Failed to create reservation:", resultAction.payload);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md border border-gray-200"
        >
            <h2 className="text-xl font-semibold mb-4">Create a Reservation</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {setStartDate(e.target.value);
                        if (endDate && new Date(e.target.value) > new Date(endDate)) {
                            setEndDate("");
                        }
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Purpose:</label>
                <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <VehicleDropdown onVehicleSelect={handleVehicleSelect} selectedVehicle={vehicle} />
            </div>
            <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-2 px-4 rounded ${
                    status === "loading"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
                {status === "loading" ? "Submitting..." : "Create Reservation"}
            </button>
        </form>
    );
};

export default ReservationForm;