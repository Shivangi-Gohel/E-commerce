import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../constant.js";

const USER_API = `${URL}/auth`;

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${USER_API}/allUsers`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        }
    })
}