import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { RoomFormValues } from '../containers/AdminTemplate/pages/RoomDetail/RoomForm';

export interface updateRoom {
    id_room: number
room_name:string
room_status: string
room_type: string
chair_number: number
created_at ?: Date
updated_at ?: Date
}
const RoomAPI = {
    getAllRoom : async () => {
        try {
            const resp = await axiosClient.get(`${API_URL.rooms}`)
            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    },

   
    updateRoom : async (id_room : number, data : RoomFormValues) => {
        try {
            const resp = await axiosClient.put(`/${API_URL.rooms}/${id_room}`,data)
            return resp
        } catch (error) {
            console.log(error);
            
        }
    },

    addRoom : async (data : RoomFormValues) => {
        try {
            const resp = await axiosClient.post(`${API_URL.rooms}`, data)
            return resp
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default RoomAPI