import { createSlice } from "@reduxjs/toolkit";
import { checkOut, deleteBillById, getAllBill, getBillById, getBillByUser, updateBillById } from "../../actions/bill";

const initialState = {
    bills: [],
    isLoading: false,
    error: ''
} as { bills: any, isLoading: boolean, error: string }
export const BillSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // get all bill
        builder.addCase(getAllBill.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllBill.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bills = action.payload.bills;
        })
        builder.addCase(getAllBill.rejected, (state) => {
            state.isLoading = false;
        })
        // get bill by user 
        builder.addCase(getBillByUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getBillByUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bills = action.payload.bills;
        })
        builder.addCase(getBillByUser.rejected, (state) => {
            state.isLoading = false;
        })
        // delete bill by id
        builder.addCase(deleteBillById.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteBillById.fulfilled, (state, action) => {
            state.isLoading = false;
            const bill = action.payload.bill
            state.bills = state?.bills?.filter((item: any) => item._id !== bill._id)
        })
        builder.addCase(deleteBillById.rejected, (state) => {
            state.isLoading = false;
        })
        // get bill by id
        builder.addCase(getBillById.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getBillById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bills = action.payload.bill;
        })
        builder.addCase(getBillById.rejected, (state) => {
            state.isLoading = false;
        })
        // checkout
        builder.addCase(checkOut.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(checkOut.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bills.push(action.payload.bill)
        })
        builder.addCase(checkOut.rejected, (state) => {
            state.isLoading = false;
        })
        // Update bill by id
        builder.addCase(updateBillById.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateBillById.fulfilled, (state, action) => {
            state.isLoading = false;
            const bill = action.payload.bill;
            state.bills = state.bills?.bill?.map((item: any) => item._id === bill._id ? bill : item)
        })
        builder.addCase(updateBillById.rejected, (state) => {
            state.isLoading = false;
        })
    },
})

export const BillReducer = BillSlice.reducer