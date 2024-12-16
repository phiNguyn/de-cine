export interface Movie {
  id_movie: number;
  movie_name: string;
  description: string;
  duration: number;
  release_date: string;
  end_date: string | null;
  country: string;
  producer: string;
  director: string;
  cast: string;
  image_main: string;
  youtube_url: string;
  poster_url: string;
  status: string;
  created_at: string;
  updated_at: string;
  genres: GenreMovie[];
  showtimes?: Record<string, newShowtime[]>;
}

export interface newShowtime {
  id_showtime: number;
  id_room: number;
  start_time: string;
  end_time: string;
  slot_time: string;
}

export interface GenreMovie {
  value: number;
  id_genre: number;
  genre_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Showtime {
  id_showtime: number;
  id_movie: number;
  id_room: number;
  date_time: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  showtime_slots: ShowtimeSlot[];
}

export interface ShowtimeSlot {
  id_slot: number;
  slot_time: string;
  created_at: string;
  updated_at: string;
  pivot: {
    id_showtime: number;
    id_slot: number;
  };
}

export interface NextShowtime {
  id_showtime: number;
  id_movie: number;
  id_room: number;
  date_time: Date;
  start_time: Date;
  end_time: Date | null;
  created_at: Date;
  updated_at: Date;
}
