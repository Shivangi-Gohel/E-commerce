import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../constant.js";

const USER_API = `${URL}/auth`;

export const useGetUsers = (page) => {
    return useQuery({
        queryKey: ["users", page],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${USER_API}/allUsers?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        }
    })
}

export const useGetUserById = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${USER_API}/getUser`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data.user;
        }
    })
}

export const useLogoutUser = () => {
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            const token = localStorage.getItem("token");
            await axios.post(`${USER_API}/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem("token");
        }
    })
}