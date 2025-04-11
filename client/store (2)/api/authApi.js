import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


export const GetOneTask = createAsyncThunk("task/GetOneTask", async (id) => {
    const res = await axios.get(`http://localhost:3002/task/${id}`)
    return res.data
})

export const deleteOneTask = createAsyncThunk("task/deleteOneTask", async (id) => {
    const res = await axios.delete(`http://localhost:3002/task/${id}`)
    return res.data

})
export const singup = createAsyncThunk("task/addTask", async (data) => {
    const res = await axios.post("http://localhost:8000/api/auth/singup", data)
    return res.data
})
export const updateData = createAsyncThunk(
    "task/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`http://localhost:3002/task/${id}`, data);
            console.log("id:", id, "data:", data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "حدث خطأ أثناء التحديث");
        }
    }
);
