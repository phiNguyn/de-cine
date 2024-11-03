 export interface Movie {
  id_movie: number;
  movie_name: string;
  price: number;
  description?: string;
  duration: number;
  release_date: string;
  country: string;
  producer: string;
  director: string;
  cast: string;
  poster_url?: string;
  id_genre: number;
  created_at: string;
  updated_at: string;
  genres :  GenreMovie[] ;
  youtube_url ?: string,
  image_main ?: string
  status ? :string
}

export interface GenreMovie {
  id_genre: number;
  genre_name: string;
  created_at: Date;
  updated_at: Date;
}
