import { toast } from 'react-toastify';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteCommentById, GetAllComments, GetCommentByProduct, PostComment } from "../api/Comment";

export const getAllComment = createAsyncThunk(
    "comment/getAllComment",
    async () => {
        try {
            const { data } = await GetAllComments();
            const comment = data.commentResponse;
            return comment
        } catch (error) {
            console.log(error);
        }
    }
)

export const postComment = createAsyncThunk(
    "comment/postComment",
    async (comment: any) => {
        try {

            const { data } = await PostComment(comment);
            toast.success(data.message);
            return data
        } catch (error: any) {
            console.log(error.message);
            toast.success(error.response.data.message);
        }
    }
)

export const getCommentByProduct = createAsyncThunk(
    "comment/getCommentByProduct",
    async (productId: string) => {
        try {
            const { data } = await GetCommentByProduct(productId);
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteCommentById = createAsyncThunk(
    "comment/deleteCommentById",
    async (_id: string) => {
        try {
            const { data } = await DeleteCommentById(_id);
            console.log(data);
            toast.success(data.message)
            return data
        } catch (error: any) {
            toast.error(error.response.data.message)
            return error
        }
    }
)