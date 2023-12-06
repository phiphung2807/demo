
import { createSlice } from "@reduxjs/toolkit";
import { deleteCommentById, getAllComment, getCommentByProduct, postComment } from "../../actions/comment";
import { IComment } from "../../interface/Comment";

const initialState = {
  comments: [],
  error: '',
  isLoading: false
} as { comments: any, isLoading: boolean, error: string }
export const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET ALL COMMENT
    builder.addCase(getAllComment.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.comments = action.payload
    })
    builder.addCase(getAllComment.rejected, (state) => {
      state.isLoading = false
    })
    // GET COMMENT BY PRODUCT
    builder.addCase(getCommentByProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCommentByProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.comments = action.payload
    })
    builder.addCase(getCommentByProduct.rejected, (state) => {
      state.isLoading = false
    })

    //  POST COMMENT
    builder.addCase(postComment.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.comments.comment.push(action.payload.comment)
    })
    builder.addCase(postComment.rejected, (state) => {
      state.isLoading = false
    })

    // Delete
    builder.addCase(deleteCommentById.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(deleteCommentById.fulfilled, (state, action) => {
      state.isLoading = false;
      const comment = action.payload.deleted;
      state.comments.docs = state?.comments?.docs?.filter((item: IComment) => item._id !== comment._id)
    })
    builder.addCase(deleteCommentById.rejected, (state) => {
      state.isLoading = false;
    })
  },
})

export const CommentReducer = CommentSlice.reducer;