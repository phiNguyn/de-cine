/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

export const AuthAPI = {
    login : async (data : {user_name : string, password : string}) => {
        try {
            const resp = await axiosClient.post(`/${API_URL.login}`,data)
            return resp.data
        } catch (error) {
            console.log(error);
        }
    },
    
    register : async (data: any) => {
        try {
        const resp = await axiosClient.post(`/${API_URL.register}` , data)
        return resp
        } catch (error) {
            console.log(error);
            
        }
    }
}
