import { useQuery } from "@tanstack/react-query";
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