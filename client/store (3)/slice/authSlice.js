import { createSlice } from "@reduxjs/toolkit";
import {
    checkAuth,
    login, logout, signup
} from "../api/authApi";
import { editPassword, editProfile, followUnFollow, ProfileFn, suggestedUser } from "../api/userApi";

const initialState = {
    userData: JSON.parse(localStorage.getItem("userData")) || [],
    loading: false,
    loginError: null,
    signupError: null,
    checkLoading: false,
    myProfile: [],
    suggestedUserList: [],
    suggestedLoading: false,
    followStatus: [],
    followLoading: false,
    profileLoading: false,

}
const authSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            // profile function

            .addCase(ProfileFn.pending, (state) => {
                state.profileLoading = true;
                state.error = null
            })
            .addCase(ProfileFn.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.myProfile = action.payload
            })
            .addCase(ProfileFn.rejected, (state, action) => {
                state.profileLoading = false;
                state.error = action.error.message
            })
            // suggested User
            .addCase(suggestedUser.pending, (state) => {
                state.suggestedLoading = true;
                state.error = null
            })
            .addCase(suggestedUser.fulfilled, (state, action) => {
                state.suggestedLoading = false;
                state.suggestedUserList = action.payload
            })
            .addCase(suggestedUser.rejected, (state, action) => {
                state.suggestedLoading = false;
                state.error = action.error.message
            })

            //follow and un follow
            .addCase(followUnFollow.pending, (state) => {
                state.followLoading = true;
                state.error = null
            })
            .addCase(followUnFollow.fulfilled, (state, action) => {
                state.followLoading = false;
                state.followStatus = action.payload.message;
                state.myProfile = action.payload.followUser;
                state.userData = action.payload.myaccount;
            })
            .addCase(followUnFollow.rejected, (state, action) => {
                state.followLoading = false;
                state.error = action.error.message;
            })

            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload));
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.signupError = action.payload
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.signupError = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload));

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.loginError = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.userData = []
                localStorage.removeItem("userData");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.checkLoading = true;
                state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.checkLoading = false;
                state.userData = action.payload
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.checkLoading = false;
                state.error = action.error.message
            })
            // edit profile
            .addCase(editProfile.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            // edit password
            .addCase(editPassword.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(editPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload
            })
            .addCase(editPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

    }
})

export default authSlice.reducer