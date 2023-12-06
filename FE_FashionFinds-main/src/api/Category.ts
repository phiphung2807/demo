import { ICategory } from "../interface/Category";
import { instance } from "./instance";
//api 
export const GetAllCategories = () => {
    return instance.get(`/categories`)
}

export const SearchCategory = (_keywords: string, _page: number) => {
    return instance.get(`/categories?_keywords=${_keywords}&_page=${_page}&_limit=10`)
}
export const GetCategoryById = (_id: string) => {
    return instance.get('/categories/' + _id)
}
export const GetCategoryBySlug = (slug: string) => {
    return instance.get('/categories/' + slug)
}
export const AddCategory = (category: ICategory) => {
    return instance.post('/categories', category)
}
export const DeleteCategory = (_id: string) => {
    return instance.delete(`/categories/` + _id)
}
export const GetProductByCategory = (categoryId: string) => {
    return instance.get(`/categories/${categoryId}/products`);
};

export const UpdateCategory = (category: ICategory) => {
    return instance.put(`/categories/${category._id}`, category);
}

