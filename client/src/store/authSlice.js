import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        id: null,
        username: null,
        role: null,
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            const { id, username, role } = action.payload;
            state.id = id;
            state.username = username;
            state.role = role;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.id = null;
            state.username = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;