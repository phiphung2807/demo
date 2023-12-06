import { instance } from "./instance";

//add, update
export const AddToCart = (cart: any) => {
  return instance.post("/cart/add", cart);
};
export const UpdateProductCart = (cart: any) => {
  return instance.put(`/cart/update`, cart);
};

//delete
export const DeleteProductCart = (cart: any) => {
  return instance.post(`/cart/delete`, cart);
};
export const DeleteAllProductCart = (userId: string) => {
  return instance.delete(`/cart/deleteall/${userId}`);
};


// get
export const GetALlCart = () => {
  return instance.get("/cart");
};
export const GetCartById = (_id: any) => {
  return instance.get(`/cart/${_id}`);
};
export const GetCartByUser = (_id: any) => {
  return instance.get(`/cart/user/${_id}`);
};

