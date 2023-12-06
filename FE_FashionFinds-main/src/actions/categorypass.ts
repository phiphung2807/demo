import { toast } from 'react-toastify';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddCategory, DeleteCategory, GetAllCategories, GetCategoryById, GetCategoryBySlug, UpdateCategory } from "../api/Category";
import { ICategoryPass } from '../interface/CategoryPass';

export const getAllCategory = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        try {
            const { data } = await GetAllCategories();
            const categories = data.CategoryResponse;
            return categories
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (_id: string, { rejectWithValue }) => {
        try {
            const { data } = await DeleteCategory(_id);
            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const getCategoryById = createAsyncThunk(
    "product/getCategoryById",
    async (_id: string, { rejectWithValue }) => {
        try {
            const { data } = await GetCategoryById(_id);

            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const getCategoryBySlug = createAsyncThunk(
    "product/getCategoryBySlug",
    async (slug: string, { rejectWithValue }) => {
        try {
            const { data } = await GetCategoryBySlug(slug);
            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)


export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (category: ICategoryPass, { rejectWithValue }) => {
        try {
            const { data } = await UpdateCategory(category);
            toast.success(data.message)
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (category: ICategory, { rejectWithValue }) => {
        try {
            const { data } = await AddCategory(category);
            toast.success(data.message);
            const catedata = data.category
            return catedata;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
);