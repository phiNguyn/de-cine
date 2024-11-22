import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const productAPI = {
  getProducts: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.products}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default productAPI;
