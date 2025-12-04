import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../constant.js";

const PRODUCT_API = `${URL}/products`;

export const useGetProducts = (page) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${PRODUCT_API}/all?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });
};

export const useGetProductById = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${PRODUCT_API}/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });
}

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ productId, ...formData }) => {
      console.log("Updating product with ID:", productId, "and data:", formData);
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${PRODUCT_API}/update`,
        { productId, name: formData.name, price: formData.price, stock: formData.stock, category: formData.category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    }
  });
}