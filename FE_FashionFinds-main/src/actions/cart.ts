import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddToCart, DeleteAllProductCart, DeleteProductCart, GetCartByUser } from "../api/Cart";
import { toast } from "react-toastify";
export const getCartByUser = createAsyncThunk(
  "cart/getCartByUser",
  async (_userId: string, { rejectWithValue }) => {
    try {
      const { data } = await GetCartByUser(_userId);
      return data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error)
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cart: any, { rejectWithValue }) => {
    try {
      const { data } = await AddToCart(cart);
      toast.success(data.message);
      return data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error)
    }
  }
);
export const deleteProductCart = createAsyncThunk(
  "cart/deleteProductCart",
  async (cart: any, { rejectWithValue }) => {
    try {
      const { data } = await DeleteProductCart(cart);
      toast.success(data.message);
      return data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error)
    }
  }
);
export const deleteAllProductCart = createAsyncThunk(
  "cart/deleteAllProductCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await DeleteAllProductCart(userId);
      toast.success(data.message);
      return data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error)
    }
  }
);

// export const updateProductCart = createAsyncThunk(
//   "cart/updateProductCart",
//   async (cart: any, { rejectWithValue }) => {
//     try {
//       const { data } = await UpdateProductCart(cart);
//       toast.success(data.message);
//       return data;
//     } catch (error: any) {
//       toast.error(error.response.data.message);
//       return rejectWithValue(error)
//     }
//   }
// );