import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const PaymentAPI = {
  getPayments: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.payments}`, );
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default PaymentAPI;
