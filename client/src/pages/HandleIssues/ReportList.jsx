import React from "react";
import Report from "./Report";

const ReportList = ({ reports, onOpenPopup }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-left">
                <thead className="bg-primary text-white">
                    <tr>
                        <th className="px-4 py-2">Vehicle</th>
                        <th className="px-4 py-2">Issue Type</th>
                        <th className="px-4 py-2">Reported At</th>
                        <th className="px-4 py-2">Resolved</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <Report
                            key={report._id}
                            report={report}
                            rowIndex={index}
                            onOpenPopup={onOpenPopup}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportList;