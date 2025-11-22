import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../constant.js";

const PRODUCT_API = `${URL}/products`;

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${PRODUCT_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
};
