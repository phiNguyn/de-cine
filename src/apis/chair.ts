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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateChair :  async(id : number, data : any) => {
        try {
            const resp = await axiosClient.put(`${API_URL.chairs}/${id}`, data)
            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    }
    
}