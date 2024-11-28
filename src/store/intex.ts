import { Chair } from "@/types/chair";
import { Product } from "@/types/product";
import { showTime } from "@/types/showtime";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedProduct {
  product: Product;
  quantity: number;
}

interface selectMovie {
  id_movie: number;
  movie_name: string;
}
interface TicketState {
  movieName: selectMovie | null;
  setMovieName: (movie: selectMovie) => void; // Hàm để đặt giá trị movie
  movieImage: string;
  selectedShowTime: string;
  selectedShowDate: showTime | null; // Chỉ có 1 giá trị showdate
  getSelectedShowDate: (id: number) => showTime | undefined; // Tìm kiếm trong danh sách hoặc lấy giá trị hiện tại
  setSelectedShowDate: (showDate: showTime) => void; // Đặt giá trị showdate

  selectedRoomId: number;

  // Ghế đã chọn
  selectedSeats: Chair[];
  addSelectedSeat: (seat: Chair) => void;
  removeSelectedSeat: (id: number) => void;
  clearSelectedSeats: () => void;

  // Sản phẩm đã chọn
  selectedProducts: SelectedProduct[];
  addProduct: (newProduct: Product) => void;
  removeProduct: (productId: number) => void;
  decreaseProductQuantity: (productId: number) => void;
  clearSelectedProducts: () => void;

  // Quản lý dữ liệu ticket
  setTicketData: (data: Partial<TicketState>) => void;
  clearTicketData: () => void;
}

export const useTicketStore = create<TicketState>()(
  persist(
    (set, get) => ({
      // Dữ liệu mặc định
      movieName: null,

      movieImage: "",
      selectedShowTime: "",
      selectedShowDate: null,
      selectedRoomId: 0,
      selectedSeats: [],
      selectedProducts: [],
      // set movie
      setMovieName: (movie) =>
        set(() => ({
          movieName: movie,
        })),
      setSelectedShowDate: (showDate) =>
        set(() => ({
          selectedShowDate: showDate,
        })),

      // Hàm lấy giá trị selectedShowDate
      getSelectedShowDate: (id) => {
        const currentShowDate = get().selectedShowDate;
        if (currentShowDate?.id_showtime === id) {
          return currentShowDate;
        }
        return undefined; // Nếu không khớp id
      },
      // Quản lý ghế đã chọn
      addSelectedSeat: (seat) =>
        set((state) => ({
          selectedSeats: [...state.selectedSeats, seat],
        })),
      removeSelectedSeat: (id) =>
        set((state) => ({
          selectedSeats: state.selectedSeats.filter(
            (seat) => seat.id_chair !== id
          ),
        })),
      clearSelectedSeats: () =>
        set(() => ({
          selectedSeats: [],
        })),

      // Quản lý sản phẩm đã chọn
      addProduct: (newProduct) =>
        set((state) => {
          const existingProduct = state.selectedProducts.find(
            (p) => p.product.id_product === newProduct.id_product
          );
          if (existingProduct) {
            return {
              selectedProducts: state.selectedProducts.map((p) =>
                p.product.id_product === newProduct.id_product
                  ? { ...p, quantity: p.quantity + 1 }
                  : p
              ),
            };
          } else {
            return {
              selectedProducts: [
                ...state.selectedProducts,
                { product: newProduct, quantity: 1 },
              ],
            };
          }
        }),

      removeProduct: (productId) =>
        set((state) => ({
          selectedProducts: state.selectedProducts.filter(
            (p) => p.product.id_product !== productId
          ),
        })),

      decreaseProductQuantity: (productId) =>
        set((state) => {
          const updatedProducts = state.selectedProducts
            .map((p) =>
              p.product.id_product === productId
                ? { ...p, quantity: p.quantity - 1 }
                : p
            )
            .filter((p) => p.quantity > 0);
          return { selectedProducts: updatedProducts };
        }),

      clearSelectedProducts: () =>
        set(() => ({
          selectedProducts: [],
        })),

      // Cập nhật dữ liệu
      setTicketData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
      clearTicketData: () =>
        set({
          movieName: null,
          movieImage: "",
          selectedShowDate: null,
          selectedShowTime: "",
          selectedRoomId: 0,
          selectedSeats: [],
          selectedProducts: [],
        }),
    }),
    { name: "ticket-storage" } // Tên được lưu trong localStorage
  )
);
