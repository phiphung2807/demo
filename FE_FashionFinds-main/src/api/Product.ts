import { IProduct } from "../interface/Product";
import { instance } from "./instance";
//api
export const SearchProducts = (keywords: string, page: number) => {
  return instance.get(`/products?_keywords=${keywords}&_page=${page}`)
}

export const GetAllProducts = () => {
  return instance.get(`/products`)
}

export const GetProductById = (_id: string) => {
  return instance.get("/products/" + _id);
};
export const GetProductBySlug = (slug: string) => {
  return instance.get("/product/" + slug);
};

export const GetProductByCategoryID = (_id: string) => {
  return instance.get("/products/categoryId/" + _id);
};

export const AddProduct = (product: IProduct) => {
  return instance.post("/products", product);
};

export const DeleteProduct = (_id: string) => {
  return instance.delete(`/products/` + _id);
};

export const UpdateProduct = (product: IProduct) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, createdAt, updatedAt, slug, review_count, average_score, ...data } = product;
  return instance.put(`/products/${_id}`, data)
}

export const getProductSearch = (_keywords: string, _limit: number) => {
  return instance.get(`/products?_keywords=${_keywords}&_limit=${_limit}`);
}
