import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const PaymentAPI = {
  getPayments: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.payments}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  createPaymentVNPAY: async (data: {
    booking_code: string;
    total_amount: number;
  }) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.vnpay}`, data);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  createPaymentMOMO: async (data: {
    booking_code: string;
    total_amount: number;
  }) => {
    const resp = await axiosClient.post(`/${API_URL.momo}`, data);
    return resp.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WebhookMOMO: async (data: any) => {
    const resp = await axiosClient.post("/momo-ipn", data);
    return resp.data;
  },
};

export default PaymentAPI;
