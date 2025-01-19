import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../store/vehiclesSlice";
import VehicleList from "./VehicleList";

const VehicleTrackingPage = () => {
    const dispatch = useDispatch();
    const { vehicles, status, error } = useSelector((state) => state.vehicles);
    
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchVehicles());
        }
    }, [status, dispatch]);

    return (
        <div>
            <h1
                className="text-3xl font-bold text-primary text-center my-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                Vehicle Tracking
            </h1>
            {status === "loading" && <p className="text-center">Loading vehicles...</p>}
            {status === "failed" && <p className="text-center text-red-500">Error: {error}</p>}
            {status === "succeeded" && <VehicleList vehicles={vehicles} />}
        </div>
    );
};

export default VehicleTrackingPage;