import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const BookingAPI = {
  createTicket: async (data) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.bookings}`, data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  getBookingsByAccountId : async (id: number) => {
    try {
    const resp = await axiosClient.get(`/${API_URL.bookingsAccount}/${id}`)
    return resp.data
  } catch (error) {
    console.log(error);
    
  }
}
};

export default BookingAPI;
