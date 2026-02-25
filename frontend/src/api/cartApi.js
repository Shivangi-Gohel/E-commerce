import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../constant.js";

const CART_API = `${URL}/cart`;

export const useAddToCart = () => {
  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${CART_API}/add`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
  });
};

export const useGetCart = (enabled = true) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${CART_API}/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled
  });
};

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: async ({ productId }) => {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${CART_API}/remove`, {
        data: { productId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${CART_API}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
}
