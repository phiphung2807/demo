import { IPostComment } from "../interface/Comment";
import { instance } from "./instance";
export const SearchComment = (keywords: string, page: number) => {
  return instance.get(`/comments?_keyword=${keywords}&_page=${page}`);
};
export const GetAllComments = () => {
  return instance.get(`/comments`);
};

export const GetCommentByProduct = (productId: string) => {
  return instance.get(`/comments/${productId}`);
};

export const DeleteCommentById = (id: string) => {
  return instance.delete(`/comments/${id}`);
};

export const PostComment = (comment: IPostComment) => {
  return instance.post(`/comments`, comment);
};
