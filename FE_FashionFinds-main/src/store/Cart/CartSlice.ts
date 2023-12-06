import { createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteAllProductCart, deleteProductCart, getCartByUser } from "../../actions/cart";

const initialState = {
  carts: [],
  error: "",
  isLoading: false,
} as { carts: any; isLoading: boolean; error: string };

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //   add: (state, action: PayloadAction<IProduct>) => {
    //     const newProduct = action.payload;

    //     const existProductIndex = state.items.findIndex((item: any) => item.id == newProduct.id);
    //     if (existProductIndex === -1) {
    //         state.items.push(newProduct);
    //     } else {
    //         state.items[existProductIndex].quantity++;
    //     }
    //     localStorage.setItem('cart', JSON.stringify(state.items))
    // },
    // increase: (state, action: PayloadAction<number>) => {
    //     state.items.find((item: any) => item.id === action.payload).quantity++
    //     localStorage.setItem('cart', JSON.stringify(state.items))
    // },
    // decrease: (state, action: PayloadAction<number>) => {
    //     const currentProduct = state.items.find((item: any) => item.id === action.payload)
    //     currentProduct.quantity--;

    //     if (currentProduct.quantity < 1) {
    //         const confirm = window.confirm('Are you fucking sure?');
    //         if (confirm) state.items = state.items.filter((item: any) => item.id !== action.payload)
    //         currentProduct.quantity = 1
    //     }
    // }
  },
  extraReducers(builder) {
    // Get cart by user
    builder.addCase(getCartByUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartByUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.carts = action.payload.data;
    });
    builder.addCase(getCartByUser.rejected, (state) => {
      state.isLoading = false;
    });

    // Add to cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.carts = action.payload.cart
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
    });

    // deletecartproduct
    builder.addCase(deleteProductCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductCart.fulfilled, (state, action) => {
      state.carts = action.payload.cart;
    });
    builder.addCase(deleteProductCart.rejected, (state) => {
      state.isLoading = false;
    });

    // deletecartproduct
    builder.addCase(deleteAllProductCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAllProductCart.fulfilled, (state, action) => {
      console.log(action.payload);
      state.carts = action.payload.cart;
    });
    builder.addCase(deleteAllProductCart.rejected, (state) => {
      state.isLoading = false;
    });

    // // decrease
    // builder.addCase(updateProductCart.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(updateProductCart.fulfilled, (state, action) => {
    //   const cart = action.payload.cart;
    //   state.carts.products = state?.carts?.products?.map((item: any) => item._id === cart._id ? cart : item)
    // });
    // builder.addCase(updateProductCart.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

export const CartReducer = CartSlice.reducer;