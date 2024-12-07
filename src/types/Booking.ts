import { Product } from "./product";
import { ShowTime } from "./showtime";

export interface Booking {
  id_booking: number;
  account_promotion_id: number | null;
  account_id: number;
  id_payment: number;
  id_ticket: number;
  booking_code: string;
  booking_date: string;
  total_amount: number;
  payment_status: string;
  transaction_id: string;
  payment_date: string;
  status: "pending" | "success" | "cancel";
  created_at: Date;
  updated_at: Date;
  ticket?: TicketBooking;
  products ?: Product[] | null
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
