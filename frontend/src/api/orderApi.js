import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../constant.js";

const ORDER_API = `${URL}/orders`;

export const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${ORDER_API}/allOrders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        }
    })
}
