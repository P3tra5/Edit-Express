import React from "react";

const ReportPopup = ({ report, onClose, onUpdateResolved }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 md:w-1/2 lg:w-1/3 p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">Report Details</h2>
                <div className="space-y-3">
                    <p>
                        <strong>Vehicle:</strong> {report.vehicle.model} ({report.vehicle.licensePlate})
                    </p>
                    <p>
                        <strong>Issue Type:</strong> {report.issueType}
                    </p>
                    <p>
                        <strong>Reported At:</strong>{" "}
                        {new Date(report.reportedAt).toLocaleString()}
                    </p>
                    <p>
                        <strong>Description:</strong> {report.description}
                    </p>
                    <div className="border-t pt-3">
                        <h3 className="text-lg font-semibold mb-2">Reservation Information</h3>
                        <p>
                            <strong>Employee:</strong> {report.employee.username} ({report.employee.email})
                        </p>
                        <p>
                            <strong>Reservation Date:</strong>{" "}
                            {new Date(report.reservation.startDate).toLocaleDateString()} -{" "}
                            {new Date(report.reservation.endDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Purpose:</strong> {report.reservation.purpose}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                    {!report.resolved && (
                        <button
                            onClick={() => onUpdateResolved(report._id)}
                            className="px-4 py-2 bg-accent text-white font-semibold rounded shadow hover:bg-secondary-dark"
                        >
                            Mark as Resolved
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 font-semibold rounded shadow hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportPopup;

/* .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
}

.popup-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #ddd;
} */