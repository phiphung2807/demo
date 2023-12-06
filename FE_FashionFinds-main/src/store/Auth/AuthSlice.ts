import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Login } from "../../actions/auth";

const initialState = {
    users: [],
    isLoading: false,
    error: ''
} as { users: any, isLoading: boolean, error: string }

export const AuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signin: (state, action: PayloadAction<any>) => {
            state.users = action.payload
        },
        signup: (state, action: PayloadAction<any>) => {
            state.users.push(action.payload);
        }
    },
    extraReducers(builder) {
        // login
        builder.addCase(Login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(Login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
        builder.addCase(Login.rejected, (state) => {
            state.isLoading = false;
        })
    },
})

export const { signin, signup } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer
