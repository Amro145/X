import { createSlice } from "@reduxjs/toolkit";
import { deleteNotifications, deleteOneNotifications, notification } from "../api/notificationApi";

const initialState = {
    notificationList: [],
    notifiactionLoading: false,
    error: null,
}
const notificationSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(notification.pending, (state) => {
                state.notifiactionLoading = true,
                    state.error = null
            })
            .addCase(notification.fulfilled, (state, action) => {
                state.notifiactionLoading = false,
                    state.notificationList = action.payload
            })
            .addCase(notification.rejected, (state, action) => {
                state.notifiactionLoading = false,
                    state.error = action.error.message
            })
            // delete one
            .addCase(deleteOneNotifications.pending, (state) => {
                state.notifiactionLoading = true,
                    state.error = null
            })
            .addCase(deleteOneNotifications.fulfilled, (state, action) => {
                state.notifiactionLoading = false,
                    state.notificationList = action.payload
            })
            .addCase(deleteOneNotifications.rejected, (state, action) => {
                state.notifiactionLoading = false,
                    state.error = action.error.message
            })
            // delete all
            .addCase(deleteNotifications.pending, (state) => {
                state.notifiactionLoading = true,
                    state.error = null
            })
            .addCase(deleteNotifications.fulfilled, (state, action) => {
                state.notifiactionLoading = false,
                    state.notificationList = action.payload
            })
            .addCase(deleteNotifications.rejected, (state, action) => {
                state.notifiactionLoading = false,
                    state.error = action.error.message
            })
    }
})
export default notificationSlice.reducer