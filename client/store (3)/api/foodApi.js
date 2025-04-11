import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const getFoodList = createAsyncThunk("food/foodList", async () => {
    const res = await axios.get("http://localhost:5000/api/foods", { withCredentials: true })
    return res.data
})
export const deleteAllFoodsList = createAsyncThunk("food/deleteAllFoodsList", async () => {
    const res = await axios.delete("http://localhost:5000/api/foods", { withCredentials: true })
    return res.data
})
export const getFood = createAsyncThunk("food/getFood", async (id) => {
    const res = await axios.get(`http://localhost:5000/api/foods/${id}`, { withCredentials: true })
    return res.data
})
export const editFood = createAsyncThunk("food/editFood", async (id) => {
    const res = await axios.put(`http://localhost:5000/api/foods/${id}`, { withCredentials: true })
    return res.data
})
export const deleteFood = createAsyncThunk("food/deleteFood", async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/foods/${id}`, { withCredentials: true })
    return res.data
})
export const addItem = createAsyncThunk("food/addItem", async (data) => {
    const res = await axios.post(`http://localhost:5000/api/foods`, data, { withCredentials: true })
    return res.data
})

