import { API_URL } from "@/constants/api";
import axiosClient from "./axiosClient";
const moviesAPI = {
  // genre movie
  getMovieDetails: async (id: number | undefined) => {
    try {
      const resp = await axiosClient.get(`${API_URL.genremovie}/${id}`);

      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllMovie: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.movies}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  getMovieById: async (id: number) => {
    try {
      const resp = await axiosClient.get(`/${API_URL.movies}/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
  getAllGenreMovies: async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.genremovie}`);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error; // Ném lại lỗi để react-query có thể xử lý
    }
  },

  addGenreMovie: async (genre_name: string) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.genremovie}`, {
        genre_name,
      });
      return resp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateGenreMovie: async (id: number | undefined, genre_name: string) => {
    try {
      const resp = await axiosClient.put(`/${API_URL.genremovie}/${id}`, {
        genre_name,
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addMovie: async (data: any) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.movies}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  },

  updateMovie: async (id: number, body) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.movies}/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-HTTP-Method-Override": "PUT", // Dùng header để báo đây là PUT
        },
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  },
};

export default moviesAPI;
