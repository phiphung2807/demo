import axios from "axios";
const token = JSON.parse(localStorage.getItem("users") || '{}');

export const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        // Dấu chấm than chắc chắn dữ liệu có và không phải null
        Authorization: `Bearer ${token.accessToken}`
    }
})