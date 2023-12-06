import { toast } from 'react-toastify';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/instance";
import { IUser } from "../interface/User";
import { GetAllUsers, GetUserById } from "../api/User";

export const searchUser = createAsyncThunk(
    "user/searchUser",
    async (keywords: string, page: any) => {
        try {
            const { data } = await instance.get(`/users?_keywords=${keywords}&_page=${page}`);
            toast.success(data.message);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const getAllUsers = createAsyncThunk(
    "user/getAllUser",
    async () => {
        try {
            const { data } = await GetAllUsers();
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (_id: string) => {
        try {
            const { data } = await instance.delete(`users/${_id}`);
            const userdata = data.user
            toast.success(data.message);
            return userdata;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
);
export const getUserById = createAsyncThunk(
    "user/getUserById",
    async (_id: string) => {
        try {
            const { data } = await GetUserById(_id);
            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (user: IUser, { rejectWithValue }) => {
        try {
            const { data } = await instance.put(`users/${user._id}`, user);
            toast.success(data.message);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
