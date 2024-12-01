import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

export const ChairAPI = {



    getAllChairByRoomId : async (roomId : number) => {
        try {
            const resp = await axiosClient.get(`${API_URL.chairs}/${API_URL.room}/${roomId}`) 
            return resp.data
        } catch (error) {
          console.log(error);
            
        }
    } ,

    GetAllChair : async () => { 
        try {
            const resp = await axiosClient.get(`${API_URL.chairs}`)
            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    },
    updateChair :  async(id : number, data) => {
        try {
            const resp = await axiosClient.put(`${API_URL.chairs}/${id}`, data)
            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    }
}