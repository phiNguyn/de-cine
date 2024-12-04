import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const PromotionAPI = {
  getAllPromotion: async () => {
    try {
      const resp = await axiosClient.get(`${API_URL.promotions}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default PromotionAPI;
