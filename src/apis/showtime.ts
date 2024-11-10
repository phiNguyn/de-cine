import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

const ShowtimeAPI = {
    getShowtimeSlot : async () => {
        try {
            const resp = await axiosClient.get(`/${API_URL.showtimeSlots}`)
            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    },


    // suat chieu
    getAllShowtimes : async () => {
        try {
            const resp =await axiosClient.get(`/${API_URL.showtimes}`)
            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    },

    addShowtime : async (data) => {
        try {
            const resp = await axiosClient.post(`/${API_URL.showtimes}`,data)
            return resp
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default ShowtimeAPI