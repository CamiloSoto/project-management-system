import axiosClient from "../config/axiosClient";
import axiosInterceptor from "../config/axiosInterceptor";

export const findUserList = async () => {
    try {
        axiosInterceptor();
        const res = await axiosClient.get(`/users`);
        return res.data;
    } catch (err) {
        console.log("err:", err);
        return null;
    }
}

export const createUser = async (user: any) => {
    try {
        axiosInterceptor();
        const res = await axiosClient.post(`/users`, user);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const updateUser = async (user: any) => {
    try {
        axiosInterceptor();
        const res = await axiosClient.put(`/users/${user._id}`, user);
        return res.data;
    } catch (err) {
        throw err;
    }
}