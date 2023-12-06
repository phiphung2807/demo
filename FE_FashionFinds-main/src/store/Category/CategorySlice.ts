import { createSlice } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../../actions/category";
import { ICategory } from "../../interface/Category";

const initialState = {
    categories: [],
    isLoading: false,
    error: ''
} as { categories: any, isLoading: boolean, error: string }
export const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // GET ALL
        builder.addCase(getAllCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload
        })
        builder.addCase(getAllCategory.rejected, (state) => {
            state.isLoading = false;
        })

        // ADD
        builder.addCase(addCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.isLoading = false;

            state.categories?.docs?.push(action.payload)
        })
        builder.addCase(addCategory.rejected, (state) => {
            state.isLoading = false;
        })

        // Update
        builder.addCase(updateCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            const product = action.payload;
            state.categories.docs = state.categories.docs.map((item: ICategory) => item._id === product._id ? product : item)
        })
        builder.addCase(updateCategory.rejected, (state) => {
            state.isLoading = false;
        })

        // Delete
        builder.addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            const category = action.payload.category._id;
            state.categories.docs = state?.categories?.docs?.filter((item: ICategory) => item._id !== category)
        })
        builder.addCase(deleteCategory.rejected, (state) => {
            state.isLoading = false;
        })

        // get category by id
        builder.addCase(getCategoryById.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCategoryById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload
        })
        builder.addCase(getCategoryById.rejected, (state) => {
            state.isLoading = false;
        })
    },
})

export const CategoryReducer = CategorySlice.reducer