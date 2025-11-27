import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useUpdateOrderStatus = () => {
    return useMutation({
        mutationFn: async ({ orderId, status }) => {
            const token = localStorage.getItem("token");
            const res = await axios.put(`${ORDER_API}/updateStatus`, 
                { orderId, status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return res.data;
        }
    });
}