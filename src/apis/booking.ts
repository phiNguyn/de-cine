import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const BookingAPI = {
  getAll: async () => {
    const resp = await axiosClient.get(`/${API_URL.bookings}`);
    return resp.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createTicket: async (data: any) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.bookings}`, data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  getBookingsByAccountId: async (id: number) => {
    try {
      const resp = await axiosClient.get(`/${API_URL.bookingsAccount}/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  getBookingDetail: async (id: number) => {
    const resp = await axiosClient.get(`/${API_URL.bookings}/${id}`);
    return resp.data;
  },

  updateBooking: async (data: { resultCode: number; orderId?: string }) => {
    const resp = await axiosClient.post("/momo-ipn", data);
    return resp;
  },
};

export default BookingAPI;
