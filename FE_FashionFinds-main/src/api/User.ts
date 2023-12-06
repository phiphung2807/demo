import { instance } from "./instance";
//api
export const SearchUser = (keywords: string, page: number) => {
    return instance.get(`/users?_keywords=${keywords}&_page=${page}`)
}

export const GetAllUsers = () => {
    return instance.get(`/users`)
}

export const DeleteUser = (_id: string) => {
    return instance.delete(`/users/` + _id)
}
export const GetUserById = (_id: string) => {
    return instance.get(`/users/` + _id);
};
export const UpdateUser = (user: any) => {
    return instance.put(`/users/${user._id}`, user);
}