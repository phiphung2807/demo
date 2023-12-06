import { toast } from 'react-toastify';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignin, ISignup } from "../interface/Auth";
import { SigninUser, SignupUser } from '../api/Auth';

export const Login = createAsyncThunk(
    "user/Login",
    async (user: ISignin, { rejectWithValue }) => {
        try {
            const { data } = await SigninUser(user);
            toast.success(data.message)
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const Register = createAsyncThunk(
    "category/Register",
    async (user: ISignup, { rejectWithValue }) => {
        try {
            const { data } = await SignupUser(user);
            toast.success(data.message)
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)