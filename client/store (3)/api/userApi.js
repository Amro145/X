import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const ProfileFn = createAsyncThunk("user/Profile", async (name) => {
    const res = await axios.get(`http://localhost:8000/api/users/profile/${name}`, { withCredentials: true })
    return res.data
})

export const followUnFollow = createAsyncThunk("user/followUnFollow", async (id) => {
    const res = await axios.post(`http://localhost:8000/api/users/follow/${id}`, { withCredentials: true })
    return res.data
})
export const suggestedUser = createAsyncThunk("user/suggestedUser", async () => {
    const res = await axios.get("http://localhost:8000/api/users/suggested", { withCredentials: true })
    return res.data
})
export const editProfile = createAsyncThunk("user/editProfile", async (data) => {
    const res = await axios.put("http://localhost:8000/api/users/updateProfile", data, { withCredentials: true })
    return res.data
})
export const editPassword = createAsyncThunk("user/editPassword", async (data) => {
    const res = await axios.put("http://localhost:8000/api/users/updatePassword", data, { withCredentials: true })
    return res.data
})



