import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../constant.js";

const ORDER_API = `${URL}/orders`;

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: async (orderData) => {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${ORDER_API}/create`, orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        }
    });
}

export const useGetOrders = (page) => {
    return useQuery({
        queryKey: ["orders", page],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${ORDER_API}/allOrders?page=${page}`, {
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

export const useGetOrderById = (orderId) => {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${ORDER_API}/myOrders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        }
    });
}