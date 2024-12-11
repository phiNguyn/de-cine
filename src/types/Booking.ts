import { ChairBooking } from "./chair";
import { ProductItem } from "./product";
import { ShowTime } from "./showtime";

export interface Booking {
  id_booking: number;
  booking_code: string;
  booking_date: string;
  total_amount: number;
  payment_status: string;
  status: string;
  account: Account;
  products?: ProductItem[] | null;
  chairs: ChairBooking[];
  showtime: showtimeBooking;
  movie_name: string;
}

export interface TicketBooking {
  id_ticket: number;
  id_showtime: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  chairs: TicketChair[];
  showtime: TicketShowtime;
}

export interface TicketChair {
  id_chair: number;
  id_room: number;
  chair_name: string;
  chair_status: string;
  column: number;
  price: number;
  row: string;
  created_at: Date;
  updated_at: Date;
}

export interface TicketShowtime extends ShowTime {
  movie: TicketShowtimeMovie;
}

export interface TicketShowtimeMovie {
  id_movie: number;
  movie_name: string;
  price: number;
  description: string;
  duration: number;
  release_date: string;
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
}

interface Account {
  id: number;
  user_name: string;
  email: string;
  full_name: string;
  avatar: string;
}

interface showtimeBooking {
  date_time: string;
  start_time: string;
  end_time: string;
}
