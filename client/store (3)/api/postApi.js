import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import Swal from "sweetalert2"
export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
    const res = await axios.get("http://localhost:8000/api/post/all", { withCredentials: true })
    return res.data
})
export const getPost = createAsyncThunk("post/getPost", async (id) => {
    const res = await axios.get(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
    return res.data
})
export const getLikedPosts = createAsyncThunk("post/getLikedPosts", async () => {
    const res = await axios.get("http://localhost:8000/api/post/liked", { withCredentials: true })
    return res.data
})
export const getFollowingPosts = createAsyncThunk("post/getFollowingPosts", async () => {
    const res = await axios.get("http://localhost:8000/api/post/following", { withCredentials: true })
    return res.data
})
export const getUserPosts = createAsyncThunk("post/getUserPosts", async (id) => {
    const res = await axios.get(`http://localhost:8000/api/post/user/${id}`, { withCredentials: true })
    return res.data
})
export const createPost = createAsyncThunk("post/createPost", async (data) => {
    const res = await axios.post(`http://localhost:8000/api/post/createpost`, { data }, { withCredentials: true })
    Swal.fire({
        title: "posted",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
    });
    return res.data
})
export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
    return res.data
})
export const createComment = createAsyncThunk("comment/createComment", async ({ id, data }) => {
    const res = await axios.post(`http://localhost:5000/api/cart/${id}`, { data }, { withCredentials: true })
    Swal.fire({
        title: "comment succes",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
    });
    return res.data
})
export const likeUnLike = createAsyncThunk("post/likeUnLike", async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/post/like/${id}`, { withCredentials: true })
    return res.data
})