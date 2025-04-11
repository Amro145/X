import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import Swal from "sweetalert2";

export const getOrderList = createAsyncThunk("order/getOrderList", async (id) => {
    const res = await axios.get(`http://localhost:5000/api/order/${id}`, { withCredentials: true })
    return res.data
})
export const getAllOrderList = createAsyncThunk("order/getAllOrderList", async () => {
    const res = await axios.get(`http://localhost:5000/api/order`, { withCredentials: true })
    return res.data
})
export const pushCartToOrder = createAsyncThunk("order/pushCartToOrder", async () => {
    const res = await axios.post("http://localhost:5000/api/order", {}, { withCredentials: true })
    Swal.fire({
        title: "Added To Order Please wait when preparing",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
    });
    return res.data
})
export const editOrder = createAsyncThunk("order/editOrder", async ({ id, status }) => {
    const res = await axios.put(`http://localhost:5000/api/order/${id}`, { status }, { withCredentials: true })
    return res.data
})
export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/order/${id}`, { withCredentials: true })
    return res.data
})
