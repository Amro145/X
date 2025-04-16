import { createSlice } from "@reduxjs/toolkit";
import { createComment, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getPost, getUserPosts, likeUnLike } from "../api/postApi"

const initialState = {
    allPostList: [],
    userPostsList: [],
    followingPostsList: [],
    likedPostsList: [],
    post: [],
    postLoading: false,
    creatPostLoading: false,
    commentLoading: false,
    error: null,
    commentError: null,
}
const postSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder
            // allpost
            .addCase(createPost.pending, (state) => {
                state.postLoading = true;
                state.creatPostLoading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.creatPostLoading = false;
                state.allPostList = action.payload;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.postLoading = false;
                state.creatPostLoading = false;
                state.error = action.error.message;
            })
            // getAllPosts
            .addCase(getAllPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.allPostList = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message;
            })
            // one post
            .addCase(getPost.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.post = action.payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message;
            })
            // following post
            .addCase(getFollowingPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getFollowingPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.followingPostsList = action.payload;
            })
            .addCase(getFollowingPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload;
            })
            // liked post
            .addCase(getLikedPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getLikedPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.likedPostsList = action.payload;
            })
            .addCase(getLikedPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload
            })
            // user post
            .addCase(getUserPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.userPostsList = action.payload;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload;
            })
            // delete Post
            .addCase(deletePost.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.allPostList = action.payload;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload;
            })
            // comment on  Post
            .addCase(createComment.pending, (state) => {
                state.commentLoading = true;
                state.commentError = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.allPostList = action.payload;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = action.payload;
            })
            // like un like on  Post
            .addCase(likeUnLike.pending, (state) => {
                state.postLoading = false;
                state.error = null;
            })
            .addCase(likeUnLike.fulfilled, (state, action) => {
                state.postLoading = false;
                state.allPostList = action.payload;
            })
            .addCase(likeUnLike.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload;
            })


    }
})
export default postSlice.reducer