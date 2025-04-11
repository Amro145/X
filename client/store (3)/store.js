import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice.js"
import foodSlice from "./slice/foodSlice.js"
import postSlice from "./slice/postSlice.js"
import orderSlice from "./slice/orderSlice.js"
export const store = configureStore({
    reducer: {
        auth: authSlice,
        food: foodSlice,
        post: postSlice,
        order : orderSlice
    },
    devTools: true
})