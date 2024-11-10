import { Movie } from "./movie";
import { Room } from "./room";

// show time
export interface ShowTimes {
  id_showtime: 1;
  id_movie: 5;
  id_room: 1;
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
  id_slot:  string;
  slot_time: string;
  created_at: Date;
  updated_at: Date;
}
