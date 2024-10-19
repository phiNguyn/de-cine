import axios from 'axios'

const moviesAPI = {
  getMovieDetails: async () => {
    try {
     
      const resp = await axios.get()
      return resp;
    } catch (error) {
      console.log(error);
    }
  },
};

export default moviesAPI;
