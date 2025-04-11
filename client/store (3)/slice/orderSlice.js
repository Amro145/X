import { createSlice } from "@reduxjs/toolkit";
import { deleteOrder, editOrder, getAllOrderList, getOrderList, pushCartToOrder } from "../api/orderApi";

const initialState = {
    orderList: [],
    orderLoading: false,
    error: null,
}
const orderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getOrderList.pending, (state) => {
                state.orderLoading = true,
                    state.error = null
            })
            .addCase(getOrderList.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderList = action.payload
            })
            .addCase(getOrderList.rejected, (state, action) => {
                state.orderLoading = false,
                    state.error = action.error.message
            })
            .addCase(getAllOrderList.pending, (state) => {
                state.orderLoading = true,
                    state.error = null
            })
            .addCase(getAllOrderList.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderList = action.payload
            })
            .addCase(getAllOrderList.rejected, (state, action) => {
                state.orderLoading = false,
                    state.error = action.error.message
            })
            .addCase(pushCartToOrder.pending, (state) => {
                state.orderLoading = true,
                    state.error = null
            })
            .addCase(pushCartToOrder.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderList = action.payload
            })
            .addCase(pushCartToOrder.rejected, (state, action) => {
                state.orderLoading = false,
                    state.error = action.error.message
            })
            .addCase(editOrder.pending, (state) => {
                state.orderLoading = true,
                    state.error = null
            })
            .addCase(editOrder.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderList = action.payload
            })
            .addCase(editOrder.rejected, (state, action) => {
                state.orderLoading = false,
                    state.error = action.error.message
            })
            .addCase(deleteOrder.pending, (state) => {
                state.orderLoading = true,
                    state.error = null
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orderLoading = false,
                    state.orderList = action.payload
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.orderLoading = false,
                    state.error = action.error.message
            })
    }
})
export default orderSlice.reducer