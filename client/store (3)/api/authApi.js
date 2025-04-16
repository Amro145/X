import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import Swal from "sweetalert2";

export const signup = createAsyncThunk("auth/singup", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post("http://localhost:8000/api/auth/signup", data, { withCredentials: true })
        Swal.fire({
            title: "Hello 🤩",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
        });
        return res.data
    } catch (error) {
        const message = error.response?.data?.message || "Signup failed";
        return rejectWithValue(message);
    }
})
export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post("http://localhost:8000/api/auth/login", data, { withCredentials: true })
        Swal.fire({
            title: "Login Succuful",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
        });
        return res.data
    } catch (error) {
        const message = error.response?.data?.message || "Login failed";
        return rejectWithValue(message);

    }
})
export const logout = createAsyncThunk("auth/logout", async () => {
    const res = await axios.get("http://localhost:8000/api/auth/logout", { withCredentials: true })
    return res.data
})
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
    const res = await axios.get("http://localhost:8000/api/auth/check", { withCredentials: true })
    return res.data
})
export const getFollowing = createAsyncThunk("user/following", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/users/following/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch following data";
        return rejectWithValue(message);
    }
})
export const getFollowers = createAsyncThunk("user/followers", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/users/followers/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch followers data";
        return rejectWithValue(message);
    }
})

