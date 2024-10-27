import { movie } from "@/types/movie";
import { create } from "zustand";

interface MovieStore {
    movie: movie[];
    
    setMovie: (movies: movie[]) => void;
    addMovie: (newMovies: movie) => void;
    updateMovie: (updatedMovies: movie) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    movie:[],
    setMovie: (movie) => set({movie}),
    addMovie: (newMovies) => set((state) => ({
        movie : [...state.movie, newMovies]
    })),
    updateMovie: (updatedMovies) => set((state) => ({
        movie : state.movie.map((m) => 
            m.id === updatedMovies.id ? updatedMovies : m)
      
        
    }))

    
}));
