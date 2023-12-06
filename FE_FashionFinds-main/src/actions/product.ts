import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../interface/Product";
import { SearchProducts, GetAllProducts, DeleteProduct, AddProduct, GetProductById, GetProductByCategoryID, UpdateProduct, GetProductBySlug } from "../api/Product";
import { toast } from "react-toastify"
import { GetProductByCategory } from "../api/Category";
export const searchProduct = createAsyncThunk(
    "product/searchProduct",
    async (keywords: any, page: any) => {
        try {
            const { data } = await SearchProducts(keywords, page);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async () => {
        try {
            const { data } = await GetAllProducts();
            const products = data.productResponse;
            return products
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (_id: string) => {
        try {
            const { data } = await DeleteProduct(_id);
            const product = data.product;
            return product;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (_id: string) => {
        try {
            const { data } = await GetProductById(_id);
            console.log(data);

            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const getProductBySlug = createAsyncThunk(
    "product/getProductBySlug",
    async (slug: string) => {
        try {
            const { data } = await GetProductBySlug(slug);
            return data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const getProductByCategoryId = createAsyncThunk(
    "product/getProductByCategoryId",
    async (_id: string) => {
        try {
            const { data } = await GetProductByCategoryID(_id);
            const products = data.productResponse;
            return products;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return error
        }
    }
)
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (product: IProduct, { rejectWithValue }) => {
        try {
            const { data } = await UpdateProduct(product);
            toast.success(data.message);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (product: any, { rejectWithValue }) => {
        try {
            const { data } = await AddProduct(product);
            toast.success(data.message);
            const productdata = data.product
            return productdata
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)
export const getProductByCategory = createAsyncThunk(
    "product/getProductByCategory",
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const { data } = await GetProductByCategory(categoryId);
            return data
        } catch (error: any) {
            toast.error(error.response.data.message);
            return rejectWithValue(error)
        }
    }
)