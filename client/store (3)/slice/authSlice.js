import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout, signup } from "../api/authApi";

const initialState = {
    userData: JSON.parse(localStorage.getItem("userData")) || [],
    loading: false,
    error: null,
    checkLoading: false
}
const authSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false,
                    state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload));
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(login.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false,
                    state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload));

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(logout.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false,
                    state.userData = []
                localStorage.removeItem("userData");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })

            .addCase(checkAuth.pending, (state) => {
                state.loading = true,
                    state.checkLoading = true,
                    state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false,
                    state.checkLoading = false,
                    state.userData = action.payload
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false,
                    state.checkLoading = false,
                    state.error = action.error.message
            })
    }
})

export default authSlice.reducer