import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, updateReportResolved } from "../../store/reportsSlice";
import ReportList from "./ReportList";
import ReportPopup from "./ReportPopup";

const HandleIssuesPage = () => {
    const dispatch = useDispatch();
    const { reports, status, error } = useSelector((state) => state.reports);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchReports());
        }
    }, [status, dispatch]);

    const handleUpdateResolved = (reportId) => {
        dispatch(updateReportResolved({ id: reportId, resolved: true }));
        closePopup();
    };

    const openPopup = (report) => {
        setSelectedReport(report);
    };

    const closePopup = () => {
        setSelectedReport(null);
    };
    
    return (
        <div className="container mx-auto px-4">
            <h1
                className="text-3xl font-bold text-center text-primary my-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                Handle Reported Issues
            </h1>
            {status === "loading" && <p className="text-center">Loading reports...</p>}
            {status === "failed" && <p className="text-center text-red-500">Error: {error}</p>}
            {status === "succeeded" && (
                <ReportList reports={reports} onOpenPopup={openPopup} />
            )}
            {selectedReport && (
                <ReportPopup
                    report={selectedReport}
                    onClose={closePopup}
                    onUpdateResolved={handleUpdateResolved}
                />
            )}
        </div>
    );
};

export default HandleIssuesPage;