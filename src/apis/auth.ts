import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

export const AuthAPI = {
    login : async (data : {user_name : string, password : string}) => {
        try {
            const resp = await axiosClient.post(`/${API_URL.login}`,data)
            return resp.data
        } catch (error) {
            console.log(error);
        }
    }
}