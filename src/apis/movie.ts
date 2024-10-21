import { API_URL } from '@/constants/api';
import axiosClient from './axiosClient';

const moviesAPI = {
  getMovieDetails: async (id: number) => {
    try {
     
      const resp = await axiosClient.get(`${API_URL.movies}/${id}`)

      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default moviesAPI;
