import { createSlice } from "@reduxjs/toolkit";
import {  ProfileFn, suggestedUser } from "../api/userApi";

const initialState = {
    myProfile: [],
    suggestedUserList: [],
    suggestedLoading : false,
    profileLoading: false,
    error: null,
    
}
const userSlice = createSlice({
    name: "user",
    initialState,
   
    extraReducers: (builder) => {
        builder
            .addCase(ProfileFn.pending, (state) => {
                state.profileLoading = true,
                    state.error = null
            })
            .addCase(ProfileFn.fulfilled, (state, action) => {
                state.profileLoading = false,
                    state.myProfile = action.payload
            })
            .addCase(ProfileFn.rejected, (state, action) => {
                state.profileLoading = false,
                    state.error = action.error.message
            })
            // suggested User
            .addCase(suggestedUser.pending, (state) => {
                state.suggestedLoading = true,
                    state.error = null
            })
            .addCase(suggestedUser.fulfilled, (state, action) => {
                state.suggestedLoading = false,
                    state.suggestedUserList = action.payload
            })
            .addCase(suggestedUser.rejected, (state, action) => {
                state.suggestedLoading = false,
                    state.error = action.error.message
            })

         

    }
})

export default userSlice.reducer