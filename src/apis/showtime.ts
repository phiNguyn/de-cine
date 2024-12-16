import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { ChairByShowtime } from "@/types/chair";

const ShowtimeAPI = {
  getShowtimeSlot: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.showtimeSlots}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  // suat chieu
  getAllShowtimes: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.showtimes}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addShowtime: async (data: any) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.showtimes}`, data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  getChairsByShowtime: async (id: number) => {
    const resp = await axiosClient.get(`/${API_URL.showtimes}/${id}/chairs`);
    return resp.data as ChairByShowtime[];
  },

  updateChairByShowtime: async (
    id_showtime: number,
    chairs: { id_chair: number; chair_status: string }[]
  ) => {
    const resp = await axiosClient.put(
      `/${API_URL.showtimes}/${id_showtime}/chairs`,
      { chairs }
    );
    return resp.data;
  },

  getShowTimeSlotByRoomAndDate: async (id_room: number, date_time: string) => {
    const resp = await axiosClient.get(
      `/${API_URL.available_slots}?id_room=${id_room}&date_time=${date_time}`
    );
    return resp.data;
  },
};

export default ShowtimeAPI;
