import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./slices/Slice"
export const store = configureStore({
    reducer: {
        taskData: taskReducer
    },
    devTools: true
})