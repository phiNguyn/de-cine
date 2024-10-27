import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import axios from "axios";

export  const UserAPI = {
    userDetail : async (id : string | undefined) => {
        try {
            const resp = await axiosClient.get(`/${API_URL.users}/${id}`)

            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    },
    getAllUsers : async () => {
        try {
            const resp = await axios.get('')
            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    }
}