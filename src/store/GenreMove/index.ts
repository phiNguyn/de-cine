import { GenreMovie } from "@/types/movie";
import { create } from "zustand";

interface GenreMovieStore {
    genreMovie: GenreMovie[];
    
    setGenreMovie: (genreMovies: GenreMovie[]) => void;
    addGenreMovie: (newGenre: GenreMovie) => void;
    updateGenreMovie: (updatedGenre: GenreMovie) => void;
  getGenre: (id ?: number) => GenreMovie | undefined;
    
}

export const useGenreMovieStore = create<GenreMovieStore>((set,get) => ({
    genreMovie: [],
    setGenreMovie:(genreMovie) => set({genreMovie}),
    addGenreMovie: (newGenre) => set((state) => ({
        genreMovie : [...state.genreMovie, newGenre]
    })),
    updateGenreMovie: (updatedGenre) => set((state) => ({
       genreMovie: state.genreMovie.map((genre) => 
    genre.id_genre === updatedGenre.id_genre ? updatedGenre : genre)
    })),
    getGenre: (id) => {
        // Sử dụng get() để lấy trạng thái hiện tại
        return get().genreMovie.find((u) => u.id_genre === id);
      },

    
}));
