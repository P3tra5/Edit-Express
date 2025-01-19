import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/* import { createApiCall } from "./api";

const createApiThunk = (type, method, url) => {
    return createAsyncThunk(type, async (data = null) => {
        return await createApiCall(method, url, data);
    });
};
 */
const handlePending = (state) => {
    state.status = "loading";
};

const handleFulfilled = (state, action, key) => {
    state.status = "succeeded";
    state[key] = action.payload;
};

const handleRejected = (state, action) => {
    state.status = "failed";
    state.error = action.payload || action.error.message;
};
/* 
export const fetchReservations = createApiThunk(
    "reservations/fetchReservations",
    "GET",
    `/reservations`
); */

export const fetchReservations = createAsyncThunk("reservations/fetchReservations",
    async () => {
        const response = await axios.get("http://localhost:3000/api/reservations");
        return response.data;
});


export const fetchUserReservations = createAsyncThunk(
    "reservations/fetchUserReservations",
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState();
        const userId = auth.id;

        try {
            const response = await axios.get(`http://localhost:3000/api/reservations/user/${userId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

/* export const createReservation = createApiThunk(
    "reservations/createReservation",
    "POST",
    `reservations`
); */

export const createReservation = createAsyncThunk("reservations/createReservation",
    async (reservationData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/reservations", reservationData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const updateReservationVehicle = createAsyncThunk("reservations/updateReservationVehicle",
    async ({ id, vehicle }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/reservations/${id}/vehicle`, { vehicle }, { withCredentials: true });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const updateReservationStatus = createAsyncThunk("reservations/updateReservationStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/reservations/${id}/status`, { status }, { withCredentials: true });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

/* export const updateReservation = createAsyncThunk("reservations/updateReservation",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/reservations/${id}`, updateData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
); */

const reservationsSlice = createSlice({
    name: "reservations",
    initialState: {
        reservations: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservations.pending, handlePending)
            .addCase(fetchReservations.fulfilled, (state, action) => handleFulfilled(state, action, "reservations"))
            .addCase(fetchReservations.rejected, handleRejected)

            .addCase(fetchUserReservations.pending, handlePending)
            .addCase(fetchUserReservations.fulfilled, (state, action) => handleFulfilled(state, action, "reservations"))
            .addCase(fetchUserReservations.rejected, handleRejected)

            .addCase(createReservation.pending, handlePending)
            .addCase(createReservation.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.reservations.push(action.payload);
            })
            .addCase(createReservation.rejected, handleRejected)

            .addCase(updateReservationVehicle.pending, handlePending)
            .addCase(updateReservationVehicle.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedReservation = action.payload;
                const index = state.reservations.findIndex(
                    (reservation) => reservation._id === updatedReservation._id
                );
                if (index !== -1) {
                    state.reservations[index] = updatedReservation;
                }
            })
            .addCase(updateReservationVehicle.rejected, handleRejected)

            .addCase(updateReservationStatus.pending, handlePending)
            .addCase(updateReservationStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedReservation = action.payload;
                const index = state.reservations.findIndex(
                    (reservation) => reservation._id === updatedReservation._id
                );
                if (index !== -1) {
                    state.reservations[index] = updatedReservation;
                }
            })
            .addCase(updateReservationStatus.rejected, handleRejected);
    },
});

export default reservationsSlice.reducer;