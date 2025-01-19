import React from "react";

const Report = ({ report, rowIndex, onOpenPopup }) => {
    const statusIcon = report.resolved ? "✔" : "✘";
    const statusColor = report.resolved ? "text-green-500" : "text-red-500";

    return (
        <tr className={`${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}>
            <td className="px-4 py-2">
                {report.vehicle.model} ({report.vehicle.licensePlate})
            </td>
            <td className="px-4 py-2">{report.issueType}</td>
            <td className="px-4 py-2">
                {new Date(report.reportedAt).toLocaleDateString()}
            </td>
            <td className={`px-4 py-2 text-center ${statusColor}`}>{statusIcon}</td>
            <td className="px-4 py-2">
                <button
                    onClick={() => onOpenPopup(report)}
                    className="px-3 py-1 bg-accent text-white rounded shadow hover:bg-secondary-dark"
                >
                    Details
                </button>
            </td>
        </tr>
    );
};

export default Report;