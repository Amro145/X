import { createSlice } from "@reduxjs/toolkit";
import { followUnFollow, Profile, suggestedUser } from "../api/userApi";

const initialState = {
    myProfile: [],
    suggestedUserList: [],
    suggestedLoading : false,
    followStatus: [],
    loading: false,
    error: null,
}
const userSlice = createSlice({
    name: "food",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(Profile.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(Profile.fulfilled, (state, action) => {
                state.loading = false,
                    state.myProfile = action.payload
            })
            .addCase(Profile.rejected, (state, action) => {
                state.loading = false,
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

            // follow un follow User
            .addCase(followUnFollow.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(followUnFollow.fulfilled, (state, action) => {
                state.loading = false,
                    state.followStatus = action.payload
            })
            .addCase(followUnFollow.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })

    }
})

export default userSlice.reducer