import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const TicketAPI = {
  createTicket: async (data) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.tickets}`, data);
      return resp.data ;
    } catch (error) {
      console.log(error);
    }
  },
};

export default TicketAPI;
