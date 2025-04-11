import { createSlice } from "@reduxjs/toolkit";
import { addItem, deleteFood, editFood, getFoodList, deleteAllFoodsList, getFood } from "../api/foodApi.js";

const initialState = {
    foodList: [],
    loading: false,
    error: null,
}
const foodSlice = createSlice({
    name: "food",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFoodList.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getFoodList.fulfilled, (state, action) => {
                state.loading = false,
                    state.foodList = action.payload
            })
            .addCase(getFoodList.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(getFood.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getFood.fulfilled, (state, action) => {
                state.loading = false,
                    state.foodList = action.payload
            })
            .addCase(getFood.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(deleteAllFoodsList.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(deleteAllFoodsList.fulfilled, (state) => {
                state.loading = false,
                    state.foodList = []
            })
            .addCase(deleteAllFoodsList.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(deleteFood.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(deleteFood.fulfilled, (state, action) => {
                state.loading = false,
                    state.foodList = action.payload
            })
            .addCase(deleteFood.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(editFood.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(editFood.fulfilled, (state, action) => {
                state.loading = false,
                    state.foodList = action.payload
            })
            .addCase(editFood.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(addItem.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.loading = false,
                    state.foodList = action.payload
            })
            .addCase(addItem.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })

    }
})

export default foodSlice.reducer