import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../store/vehiclesSlice";

const VehicleDropdown = ({ onVehicleSelect, selectedVehicle  }) => {
    const dispatch = useDispatch();
    const { vehicles, status } = useSelector((state) => state.vehicles);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchVehicles());
        }
    }, [status, dispatch]);

    return (
        <div>
            <select value={selectedVehicle} onChange={(e) => onVehicleSelect(e.target.value)}>
                <option value="">-- Select a vehicle --</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.model} ({vehicle.licensePlate})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default VehicleDropdown;