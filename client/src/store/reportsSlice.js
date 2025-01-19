import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReports = createAsyncThunk("reports/fetchReports", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:3000/api/reports", { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
});

export const fetchReportById = createAsyncThunk("reports/fetchReportById", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/reports/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
});

export const createReport = createAsyncThunk("reports/createReport", async (reportData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:3000/api/reports", reportData, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
});

export const updateReportResolved = createAsyncThunk("reports/updateReportResolved", async ({ id, resolved }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`http://localhost:3000/api/reports/${id}/resolved`, { resolved }, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
});

const reportsSlice = createSlice({
    name: "reports",
    initialState: {
        reports: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reports = action.payload;
            })
            .addCase(fetchReports.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(fetchReportById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchReportById.fulfilled, (state, action) => {
                state.status = "succeeded";
                const fetchedReport = action.payload;
                const index = state.reports.findIndex((report) => report._id === fetchedReport._id);
                if (index !== -1) {
                    state.reports[index] = fetchedReport;
                } else {
                    state.reports.push(fetchedReport);
                }
            })
            .addCase(fetchReportById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(createReport.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createReport.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reports.push(action.payload);
            })
            .addCase(createReport.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(updateReportResolved.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateReportResolved.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedReport = action.payload;
                const index = state.reports.findIndex((report) => report._id === updatedReport._id);
                if (index !== -1) {
                    state.reports[index] = updatedReport;
                }
            })
            .addCase(updateReportResolved.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default reportsSlice.reducer;
