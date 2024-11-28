import { Chair } from "@/types/chair";
import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedProduct {
  product: Product;
  quantity: number;
}
interface TicketState {
  movieName: string;
  movieImage: string;
  selectedShowDate: string;
  selectedShowTime: string;
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
    (set) => ({
      // Dữ liệu mặc định
      movieName: "",
      movieImage: "",
      selectedShowDate: "",
      selectedShowTime: "",
      selectedRoomId: 0,
      selectedSeats: [],
      selectedProducts: [],

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
          movieName: "",
          movieImage: "",
          selectedShowDate: "",
          selectedShowTime: "",
          selectedRoomId: 0,
          selectedSeats: [],
          selectedProducts: [],
        }),
    }),
    { name: "ticket-storage" } // Tên được lưu trong localStorage
  )
);
