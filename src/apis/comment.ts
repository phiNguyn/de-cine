import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";

export const commentAPI = { 
    getAllComments: async () => {
        try {
            const resp = await axiosClient.get(`/${API_URL.comment}`);
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    },

    getCommentByIdMovie: async (id_movie:number) => { 
        try {
            const resp = await axiosClient.get(`/${API_URL.comment}/comments-movie/${id_movie}`);
            return resp.data;
        } catch (error) {
            console.error(error);
            
        }
    },

    CreateComment: async () => {
        try {
            const resp = await axiosClient.post(`/${API_URL.comment}`,);
            return resp.data;
        } catch (error) {
            console.error(error);
            
        }
    },

    DeleteComment: async () => {
        try {
            const resp = await axiosClient.delete(`/${API_URL.comment}/:id`);
            return resp.data;
        } catch (error) {
            console.error(error);
            
        }
    },

    UpdateComment: async () => {
        try {
            const resp = await axiosClient.put(`/${API_URL.comment}/:id`);
            return resp.data;
        } catch (error) {
            console.error(error);
            
        }
    }

}