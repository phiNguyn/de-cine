export interface movie {
  id: number;
  name: string;
  image: string;
  ytSlug?: string;
  tag?: string;
  year?: number;
  time?: string;
  decripetion?: string;
  country?: string;
  genre?: string;
  director?: string;
  actor?: string[];
}

export interface GenreMovie {
  id_genre: number;
  genre_name: string;
  created_at: Date;
  updated_at: Date;
}
