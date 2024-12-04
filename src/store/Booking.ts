import { Booking } from "@/types/Booking";
import { create } from "zustand";

interface BookingStore {
  Booking: Booking[];
  setBooking: (Bookings: Booking[]) => void;
  addBooking: (newBooking: Booking) => void;
  updateBooking: (updatedBooking: Booking) => void;
  BookingDetail: Booking | null;
  getBookingById: (id: number) => Booking | undefined;
}

export const useBooking = create<BookingStore>((set, get) => ({
  Booking: [],
  setBooking: (Booking) => set({ Booking }),
  addBooking: (newBooking) =>
    set((state) => ({
      Booking: [...state.Booking, newBooking],
    })),
  updateBooking: (updatedBooking) =>
    set((state) => ({
      Booking: state.Booking.map((u) =>
        u.id_booking === updatedBooking.id_booking ? updatedBooking : u
      ),
    })),
  BookingDetail: null,
  getBookingById: (id) => {
    // Sử dụng get() để lấy trạng thái hiện tại
    return get().Booking.find((u) => u.id_booking === id);
  },
}));
