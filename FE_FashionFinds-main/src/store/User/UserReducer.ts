
import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../../actions/user";
import { IUser } from "../../interface/User";

const initialState = {
    users: [],
    isLoading: false,
    error: ''
} as { users: any, isLoading: boolean, error: string }

export const AuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // GET all
        builder.addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.users = action.payload.userResponse;
        })
        builder.addCase(getAllUsers.rejected, (state) => {
            state.isLoading = false
        })
        // GET
        builder.addCase(getUserById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.isLoading = false
            state.users = action.payload;
        })
        builder.addCase(getUserById.rejected, (state) => {
            state.isLoading = false
        })
        // UPDATE
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false
            const product = action.payload;
            console.log(product);
            state.users.docs = state?.users?.docs?.map((item: any) => item._id === product._id ? product : item)
        })
        builder.addCase(updateUser.rejected, (state) => {
            state.isLoading = false
        })
        // delete
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            const user = action.payload;
            console.log(user);
            state.users.docs = state?.users?.docs?.filter((item: IUser) => item._id !== user._id)
        })
        builder.addCase(deleteUser.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export const UserReducer = AuthSlice.reducer
