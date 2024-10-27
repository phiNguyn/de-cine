import { GenreMovie } from "@/types/movie";
import { create } from "zustand";

interface GenreMovieStore {
    genreMovie: GenreMovie[];
    
    setGenreMovie: (genreMovies: GenreMovie[]) => void;
    addGenreMovie: (newGenre: GenreMovie) => void;
    updateGenreMovie: (updatedGenre: GenreMovie) => void;
}

export const useGenreMovieStore = create<GenreMovieStore>((set) => ({
    genreMovie: [],
    setGenreMovie:(genreMovie) => set({genreMovie}),
    addGenreMovie: (newGenre) => set((state) => ({
        genreMovie : [...state.genreMovie, newGenre]
    })),
    updateGenreMovie: (updatedGenre) => set((state) => ({
       genreMovie: state.genreMovie.map((genre) => 
    genre.id_genre === updatedGenre.id_genre ? updatedGenre : genre)
    }))
}));
