import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReport } from "../../store/reportsSlice";

const IssueReport = ({ reservation, onClose }) => {
    const [issueType, setIssueType] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!issueType || !description) {
            alert("Please fill in all fields.");
            return;
        }
        dispatch(createReport({
            reservationId: reservation._id,
            issueType,
            description,
        }));
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 md:w-1/2 lg:w-1/3 p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">Report an Issue</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Issue Type:</label>
                        <select
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select an issue</option>
                            <option value="damage">Damage</option>
                            <option value="technical issue">Technical Issue</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Provide a detailed description of the issue"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 font-semibold rounded shadow hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IssueReport;