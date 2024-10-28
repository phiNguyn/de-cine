import { Movie } from "@/types/movie";
import { create } from "zustand";

interface MovieStore {
    movie: Movie[];
    
    setMovie: (movies: Movie[]) => void;
    addMovie: (newMovies: Movie) => void;
    updateMovie: (updatedMovies: Movie) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    movie:[],
    setMovie: (movie) => set({movie}),
    addMovie: (newMovies) => set((state) => ({
        movie : [...state.movie, newMovies]
    })),
    updateMovie: (updatedMovies) => set((state) => ({
        movie : state.movie.map((m) => 
            m.id_movie === updatedMovies.id_movie ? updatedMovies : m)   
    }))

    
}));
