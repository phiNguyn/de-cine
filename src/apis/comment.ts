import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
import { Comment } from "@/types/comment"; // Import interface Comment
export interface GetCommentFilter {
  from?: string;
  to?: string;
  rating?: number | string;
  id_movie?: number | string;
}
export const commentAPI = {
  /**
   * Lấy tất cả các bình luận
   */

  getAllComments: async (filters?: GetCommentFilter) => {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.from !== undefined)
          params.append("from", filters.from.toString());
        if (filters.to !== undefined)
          params.append("to", filters.to.toString());
        if (filters.rating !== undefined)
          params.append("rating", filters.rating.toString());
        if (filters.id_movie !== undefined)
          params.append("id_movie", filters.id_movie.toString());
      }
      const resp = await axiosClient.get(
        `${API_URL.comment}?${params.toString()}`
      );
      console.log(resp.data);

      return resp.data as Comment[];
    } catch (error) {
      console.error("Error fetching all comments:", error);
    }
  },

  /**
   * Lấy tất cả bình luận theo ID phim
   * @param id_movie ID của phim
   */
  getCommentsByMovieId: async (
    id_movie: number
  ): Promise<Comment[] | undefined> => {
    try {
      const resp = await axiosClient.get(
        `http://127.0.0.1:8000/api/comments-movie/${id_movie}`
      );
      return resp.data;
    } catch (error) {
      console.error(`Error fetching comments for movie ID ${id_movie}:`, error);
    }
  },

  /**
   * Tạo bình luận mới
   * @param comment Dữ liệu bình luận mới
   */
  createComment: async (
    comment: Omit<Comment, "id" | "created_at" | "updated_at">
  ): Promise<Comment | undefined> => {
    try {
      const resp = await axiosClient.post(`${API_URL.comment}`, comment);
      return resp.data;
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  },

  deleteComment: async (id: number) => {
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
  updateComment: async (
    id: number,
    comment: Partial<Omit<Comment, "id" | "id_movies" | "id_account">>
  ): Promise<Comment | undefined> => {
    try {
      const resp = await axiosClient.put(`/${API_URL.comment}/${id}`, comment);
      return resp.data;
    } catch (error) {
      console.error(`Error updating comment with ID ${id}:`, error);
    }
  },

  sumaryCommnet: async (id_movie: number) => {
    try {
      const resp = await axiosClient.get(
        `/${API_URL.comment}/${id_movie}/rating-content`
      );
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
};
