import { ChairByShowtime } from "@/types/chair";
import { Product } from "@/types/product";
import { Promotion } from "@/types/promotion";
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
export interface TicketState {
  movieName: selectMovie | null;
  setMovieName: (movie: selectMovie) => void; // Hàm để đặt giá trị movie
  movieImage: string;
  selectedShowTime: string;
  selectedShowDate: showTime | null; // Chỉ có 1 giá trị showdate
  getSelectedShowDate: (id: number) => showTime | undefined; // Tìm kiếm trong danh sách hoặc lấy giá trị hiện tại
  setSelectedShowDate: (showDate: showTime) => void; // Đặt giá trị showdate

  selectedRoomId: number | null;

  // Ghế đã chọn
  selectedSeats: ChairByShowtime[];
  addSelectedSeat: (seat: ChairByShowtime) => void;
  removeSelectedSeat: (id: number) => void;
  clearSelectedSeats: () => void;

  // promotions
  selectedPromotion: Promotion | null;
  setSelectedPromotion: (promotion: Promotion | null) => void;
  // Sản phẩm đã chọn
  selectedProducts: SelectedProduct[];
  addProduct: (newProduct: Product) => void;
  removeProduct: (productId: number) => void;
  decreaseProductQuantity: (productId: number) => void;
  clearSelectedProducts: () => void;

  // Tính tổng
  getTotalPrice: () => number; // Thêm phương thức để tính tổng giá
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
      selectedPromotion: null,
      setSelectedPromotion: (promotion) => set({ selectedPromotion: promotion }),
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
          selectedSeats: state.selectedSeats.filter((seat) => seat.id !== id),
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

      // Tổng
      getTotalPrice: () => {
        const totalSeatsPrice = get().selectedSeats.reduce(
          (total, seat) => total + seat.price,
          0
        );
        const totalProductsPrice = get().selectedProducts.reduce(
          (total, { product, quantity }) => total + product.price * quantity,
          0
        );
      
        const promotion = get().selectedPromotion;
        let totalPromotionPrice = 0;
        const totalPriceBeforeDiscount = totalSeatsPrice + totalProductsPrice;
      
        if (promotion && promotion.discount_value >= 0) {
          // Kiểm tra điều kiện min_purchase_amount
          if (
            !promotion.min_purchase_amount ||
            totalPriceBeforeDiscount >= promotion.min_purchase_amount
          ) {
            if (promotion.discount_type === "percentage") {
              totalPromotionPrice =
                totalPriceBeforeDiscount * (promotion.discount_value / 100);
      
              // Kiểm tra giới hạn max_discount_amount
              if (promotion.max_discount_amount) {
                totalPromotionPrice = Math.min(
                  totalPromotionPrice,
                  promotion.max_discount_amount
                );
              }
            } else {
              totalPromotionPrice = promotion.discount_value;
      
              // Giới hạn giảm giá không vượt quá max_discount_amount
              if (
                promotion.max_discount_amount &&
                totalPromotionPrice > promotion.max_discount_amount
              ) {
                totalPromotionPrice = promotion.max_discount_amount;
              }
            }
          }
        }
      
        // Tổng giá cuối cùng (không âm)
        return Math.max(0, totalPriceBeforeDiscount - totalPromotionPrice);
      },
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
          selectedPromotion: null
        }),
    }),
    { name: "ticket-storage" } // Tên được lưu trong localStorage
  )
);
