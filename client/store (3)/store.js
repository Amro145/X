import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice.js"
// import userSlice from "./slice/userSlice.js"
import postSlice from "./slice/postSlice.js"
import notificationSlice from "./slice/notifactionSlice.js"
export const store = configureStore({
    reducer: {
        auth: authSlice,
        // user: userSlice,
        post: postSlice,
        notification: notificationSlice
    },
    devTools: true
})