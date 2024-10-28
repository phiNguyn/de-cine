import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import axios from "axios";
import { User } from "@/types/user";

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
            const resp = await axiosClient.get(`/${API_URL.accounts}`)
            return resp.data
        } catch (error) {
            console.log(error);
            
        }
    },

    updateUser : async (id : number, data : any) => {
        try {
            const resp = await axiosClient.put(`/${API_URL.accounts}/${id}` ,data)
            return resp
        } catch (error) {
            console.log(error);
            
        }
    },
    addUser : async (data : any) => {
        try {
        const resp = await axiosClient.post(`/${API_URL.register}` , data)
        return resp
        } catch (error) {
            console.log(error);
            
        }
    }
}