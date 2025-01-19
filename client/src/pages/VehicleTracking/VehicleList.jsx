import React from "react";
import Vehicle from "./Vehicle";

const VehicleList = ({ vehicles }) => {
    return (
        <div className="container mx-auto px-4">
            <table className="w-full text-left border border-gray-300">
                <thead className="bg-primary text-white">
                    <tr>
                        <th className="px-4 py-2">Model</th>
                        <th className="px-4 py-2">License Plate</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Inspection Date</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle, index) => (
                        <Vehicle key={vehicle._id} vehicle={vehicle} rowIndex={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleList;