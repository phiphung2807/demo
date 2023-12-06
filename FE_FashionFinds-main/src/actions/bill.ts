import { createAsyncThunk } from "@reduxjs/toolkit";
import { CheckOut, DeleteBillById, GetAllBill, GetBillById, GetBillByUser, UpdateBillById } from "../api/Bill";
import { toast } from "react-toastify";

export const getAllBill = createAsyncThunk(
    "bill/getAllBill",
    async () => {
        try {
            const { data } = await GetAllBill();
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const getBillByUser = createAsyncThunk(
    "bill/getBillByUser",
    async (_userId: string, { rejectWithValue }) => {
        try {
            const { data } = await GetBillByUser(_userId);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const checkOut = createAsyncThunk(
    "bill/checkOut",
    async (cart: any, { rejectWithValue }) => {
        try {
            const { data } = await CheckOut(cart);
            toast.success(data.message);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const getBillById = createAsyncThunk(
    "bill/getBillById",
    async (billId: any, { rejectWithValue }) => {
        try {
            const { data } = await GetBillById(billId);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const deleteBillById = createAsyncThunk(
    "bill/deleteBillById",
    async (_id: any, { rejectWithValue }) => {
        try {
            const { data } = await DeleteBillById(_id);
            toast.success(data.message);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const updateBillById = createAsyncThunk(
    "bill/updateBillById",
    async (bill: any, { rejectWithValue }) => {
        try {
            const { data } = await UpdateBillById(bill);
            toast.success(data.message);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
