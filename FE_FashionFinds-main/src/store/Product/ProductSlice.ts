import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getAllProduct, getProductByCategory, getProductByCategoryId, getProductById, searchProduct, updateProduct } from "../../actions/product";
import { IProduct } from "../../interface/Product";

const initialState = {
    products: [],
    isLoading: false,
    error: ''
} as { products: any, isLoading: boolean, error: string }
export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // SEARCH
        builder.addCase(searchProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload
        })
        builder.addCase(searchProduct.rejected, (state) => {
            state.isLoading = false;
        })
        // GET ALL
        builder.addCase(getAllProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload
        })
        builder.addCase(getAllProduct.rejected, (state) => {
            state.isLoading = false;
        })

        // ADD
        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products?.docs?.push(action.payload)
        })
        builder.addCase(addProduct.rejected, (state) => {
            state.isLoading = false;
        })

        // Update
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            const product = action.payload.product;
            console.log(product);

            state.products.docs = state.products?.docs.map((item: IProduct) => item._id === product._id ? product : item)
        })
        builder.addCase(updateProduct.rejected, (state) => {
            state.isLoading = false;
        })
        // Delete
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            const product = action.payload;
            state.products.docs = state?.products?.docs?.filter((item: IProduct) => item._id !== product._id)
        })
        builder.addCase(deleteProduct.rejected, (state) => {
            state.isLoading = false;
        })
        // get product by id
        builder.addCase(getProductById.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload
        })
        builder.addCase(getProductById.rejected, (state) => {
            state.isLoading = false;
        })
        // get getProductByCategoryId
        builder.addCase(getProductByCategoryId.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProductByCategoryId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload
        })
        builder.addCase(getProductByCategoryId.rejected, (state) => {
            state.isLoading = false;
        })
        // get product by category
        builder.addCase(getProductByCategory.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProductByCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload.products);

            state.products = action.payload.products
        })
        builder.addCase(getProductByCategory.rejected, (state) => {
            state.isLoading = false;
        })
    },
})

export const ProductReducer = ProductSlice.reducer