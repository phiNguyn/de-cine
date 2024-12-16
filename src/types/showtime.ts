import { Movie } from "./movie";
import { Room } from "./room";

// show time
export interface ShowTimes {
  id_showtime: number;
  id_movie: number;
  id_room: number;
  date_time: Date;
  start_time: Date;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
  movie: Movie;
  room: Room;
}

// next show times
export interface ShowTime {
  id_showtime: number;
  id_movie: number;
  id_room: number;
  date_time: Date;
  start_time: Date;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ShowTimeSlot {
  id_slot: number;
  slot_time: string;
  created_at: Date;
  updated_at: Date;
}

export interface showTime {
  id_showtime?: number;
  date_time?: string;
}
