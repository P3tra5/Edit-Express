import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVehicles = createAsyncThunk("vehicles/fetchVehicles", async () => {
    const response = await axios.get("http://localhost:3000/api/vehicles");
    return response.data;
});

export const updateVehicleInspectionDate = createAsyncThunk("vehicles/updateVehicleInspectionDate",
    async ({ id, inspectionDate }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/vehicles/${id}/inspection-date`, { inspectionDate }, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const updateVehicleStatus = createAsyncThunk("vehicles/updateVehicleStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/vehicles/${id}/status`, { status }, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

const vehiclesSlice = createSlice({
    name: "vehicles",
    initialState: {
        vehicles: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(updateVehicleInspectionDate.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateVehicleInspectionDate.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedVehicle = action.payload;
                const index = state.vehicles.findIndex(
                    (vehicle) => vehicle._id === updatedVehicle._id
                );
                if (index !== -1) {
                    state.vehicles[index] = updatedVehicle;
                }
            })
            .addCase(updateVehicleInspectionDate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(updateVehicleStatus.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateVehicleStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedVehicle = action.payload;
                const index = state.vehicles.findIndex(
                    (vehicle) => vehicle._id === updatedVehicle._id
                );
                if (index !== -1) {
                    state.vehicles[index] = updatedVehicle;
                }
            })
            .addCase(updateVehicleStatus.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default vehiclesSlice.reducer;