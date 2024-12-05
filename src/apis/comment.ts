import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { Comment } from "@/types/comment"; // Import interface Comment

export const commentAPI = { 
    /**
     * Lấy tất cả các bình luận
     */
    getAllComments: async (): Promise<Comment[] | undefined> => {
        try {
            const resp = await axiosClient.get(`${API_URL.comment}`);
            return resp.data;
        } catch (error) {
            console.error("Error fetching all comments:", error);
        }
    },

    /**
     * Lấy tất cả bình luận theo ID phim
     * @param id_movie ID của phim
     */
    getCommentsByMovieId: async (id_movie: number): Promise<Comment[] | undefined> => { 
        try {
            const resp = await axiosClient.get(`http://127.0.0.1:8000/api/comments-movie/${id_movie}`);
            return resp.data;
        } catch (error) {
            console.error(`Error fetching comments for movie ID ${id_movie}:`, error);
        }
    },

    /**
     * Tạo bình luận mới
     * @param comment Dữ liệu bình luận mới
     */
    createComment: async (comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>): Promise<Comment | undefined> => {  
        try {
            const resp = await axiosClient.post(`${API_URL.comment}`, comment);
            return resp.data;
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    },

   
    deleteComment: async (id:number) => {
        try {
          const resp = await axiosClient.delete(`${API_URL.comment}/${id}`);
          return resp.data;
        } catch (error) {
          console.log(error);
        }
      },
      
    /**
     * Cập nhật bình luận
     * @param id ID của bình luận cần cập nhật
     * @param comment Dữ liệu cập nhật (chỉ nhận trường cần thay đổi)
     */
    updateComment: async (id: number, comment: Partial<Omit<Comment, 'id' | 'id_movies' | 'id_account'>>): Promise<Comment | undefined> => {  
        try {
            const resp = await axiosClient.put(`/${API_URL.comment}/${id}`, comment);
            return resp.data;
        } catch (error) {
            console.error(`Error updating comment with ID ${id}:`, error);
        }
    },

    sumaryCommnet: async (id_movie:number) => {
        try {
          const resp = await axiosClient.get(`/${API_URL.comment}/${id_movie}/rating-content`);
          return resp.data;
        } catch (error) {
          console.log(error);
        }
      },
   
};
