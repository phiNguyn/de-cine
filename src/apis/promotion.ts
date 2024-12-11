// PromotionAPI.js
import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { Promotion } from "@/types/promotion";
import { PromotionFormValues } from "@/containers/AdminTemplate/pages/ListPromotion/editPromotion";

const PromotionAPI = {
  getAllPromotion: async () => {
    try {
      const resp = await axiosClient.get(`${API_URL.promotions}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  updatePromotion: async (id:number, data:PromotionFormValues) => {
    try {
      const resp = await axiosClient.put(`${API_URL.promotions}/${id}`, data);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  addPromotion: async (data: Promotion) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.promotions}`, data)
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  deletePromotion: async (id:number) => {
    try {
      const resp = await axiosClient.delete(`${API_URL.promotions}/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  
  getPromotionById: async (id: number) => {
  try {
    const resp = await axiosClient.get(`${API_URL.promotions}/${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  
  }
  },

  redeemDiscount: async (promotion_id:number,id_account:number) => { 
    try {
      const resp = await axiosClient.post(`${API_URL.redeem_discount}`, {promotion_id,id_account});
      return resp;
    } catch (error) {
      console.log(error);
      
    }
  }
};

export default PromotionAPI;
