import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { ProductFormValues } from "@/containers/AdminTemplate/pages/Products/AddProduct";
import { Product } from "@/types/product";

const productAPI = {
  getProducts: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.products}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  getAllProductActive: async (is_active?: boolean) => {
    try {
      const resp = await axiosClient.get(`/${API_URL.products}`, {
        params: { is_active },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  
  addProduct: async (data: Product) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.products}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  updateProduct: async (id?: number, data: ProductFormValues) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.products}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-HTTP-Method-Override": "PUT", // Dùng header để báo đây là PUT
        },
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  },
};

export default productAPI;
