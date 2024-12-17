import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

export interface GetRevenueFilter {
  id_movie?: string;
  year?: string;
  month?: string;
  date?: number;
}
const RevenueAPI = {
  getRevenue: async (filters?: GetRevenueFilter) => {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.id_movie !== undefined)
          params.append("id_movie", filters.id_movie.toString());
        if (filters.year !== undefined)
          params.append("year", filters.year.toString());
        if (filters.month !== undefined)
          params.append("month", filters.month.toString());
        if (filters.date !== undefined)
          params.append("date", filters.date.toString());
      }
      const resp = await axiosClient.get(
        `/statistics/${API_URL.revenueByMovie}?${params.toString()}`
      );
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  getRevenueByMonth: async (year: number, month: number) => {
    const resp = await axiosClient.get(
      `/statistics/${API_URL.revenueByMovie}?year=${year}&month=${month}`
    );
    return resp.data;
  },

  getTicketSale: async () => {
    const resp = await axiosClient.get(`/statistics/${API_URL.ticketSales}`);
    return resp.data;
  },
  getRevenueAll: async () => {
    const resp = await axiosClient.get(`/statistics/${API_URL.revenue}`);
    return resp.data;
  },
};

export default RevenueAPI;
