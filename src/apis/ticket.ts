import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const TicketAPI = {
  createTicket: async (data : {id_showtime : number, id_chairs : number[], status : string}) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.tickets}`, data);
      return resp.data ;
    } catch (error) {
      console.log(error);
    }
  },
};

export default TicketAPI;
