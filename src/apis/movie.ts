import { API_URL } from '@/constants/api';
import axiosClient from './axiosClient';
const moviesAPI = {

  // genre movie
  getMovieDetails: async (id: number | undefined) => {
    try {
     
      const resp = await axiosClient.get(`${API_URL.genremovie}/${id}`)

      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllMovie : async() => {
    try {
      const resp = await axiosClient.get(`/${API_URL.movies}`)
      return resp.data
    } catch (error) {
      console.log(error);
      
    }
  }
  ,

    getMovieById : async(id : number) => {
      try {
        const resp = await axiosClient.get(`/${API_URL.movies}/${id}`)
        return resp.data
      } catch (error) {
        console.log(error);
         
      }
    } ,
  getAllGenreMovies : async () => {
    try {
      const resp = await axiosClient.get(`/${API_URL.genremovie}`)
      return resp.data
    } catch (error) {
      console.log(error);
      throw error; // Ném lại lỗi để react-query có thể xử lý
    }
  },

  addGenreMovie : async (genre_name : string) => {
    try {
      const resp = await axiosClient.post(`/${API_URL.genremovie}`, {genre_name})
      return resp
    } catch (error) {
      console.error(error);
      throw error
      
    }
  }
};

export default moviesAPI;
