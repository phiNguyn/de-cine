import { Movie } from "@/types/movie";
import { create } from "zustand";

interface MovieStore {
    movie: Movie[];

    setMovie: (movies: Movie[]) => void;
    addMovie: (newMovies: Movie) => void;
    updateMovie: (updatedMovies: Movie) => void;
    getMovieById: (id: number) => Movie | undefined;
    getMovieNames: () => string[];  // Lấy tên tất cả các bộ phim
    getMovieImages: () => string[]; // Lấy URL ảnh của tất cả các bộ phim
}

export const useMovieStore = create<MovieStore>((set, get) => ({
    movie: [],

    setMovie: (movies) => set({ movie: movies }),

    addMovie: (newMovies) => set((state) => ({
        movie: [...state.movie, newMovies],
    })),

    updateMovie: (updatedMovies) => set((state) => ({
        movie: state.movie.map((m) =>
            m.id_movie === updatedMovies.id_movie ? updatedMovies : m
        ),
    })),

    getMovieById: (id) => {
        // Sử dụng get() để lấy trạng thái hiện tại
        return get().movie.find((u) => u.id_movie === id);
    },

    getMovieNames: () => {
        // Trả về một mảng các tên phim
        return get().movie.map((m) => m.movie_name);
    },

    getMovieImages: () => {
        // Trả về một mảng các URL ảnh của phim
        return get().movie.map((m) => m.image_main);
    },
}));
