import { Promotion } from "@/types/promotion";
import { create } from "zustand";

interface SelectedPromotion {
  promotion: Promotion;
  discount: number;
}

interface PromotionStore {
  promotions: Promotion[];
  selectedPromotions: SelectedPromotion[];
  setPromotions: (promotions: Promotion[]) => void;
  addPromotion: (newPromotion: Promotion) => void;
  removePromotion: (promotionId: number) => void;
  updatePromotion: (updatedPromotion: Promotion) => void;
  getPromotionById: (id: number) => Promotion | null;
  selectPromotion: (promotionId: number) => void;
  decreasePromotionDiscount: (promotionId: number) => void;
}

export const usePromotionStore = create<PromotionStore>((set, get) => ({
  promotions: [],
  selectedPromotions: [],

  // Set danh sách khuyến mãi
  setPromotions: (promotions) => set({ promotions }),

  // Thêm khuyến mãi mới
  addPromotion: (newPromotion) =>
    set((state) => ({
      promotions: [...state.promotions, newPromotion],
    })),

  // Xóa khuyến mãi
  removePromotion: (promotionId) =>
    set((state) => ({
      promotions: state.promotions.filter((p) => p.id_promotion !== promotionId),
    })),

  // Cập nhật khuyến mãi
  updatePromotion: (updatedPromotion) =>
    set((state) => ({
      promotions: state.promotions.map((p) =>
        p.id_promotion === updatedPromotion.id_promotion ? updatedPromotion : p
      ),
    })),

  // Tìm khuyến mãi theo ID
  getPromotionById: (id) => {
    return get().promotions.find((promotion) => promotion.id_promotion === id) || null;
  },

  // Chọn khuyến mãi để áp dụng
  selectPromotion: (promotionId) =>
    set((state) => {
      const existingPromotion = state.selectedPromotions.find(
        (p) => p.promotion.id_promotion === promotionId
      );

      if (existingPromotion) {
        return {
          selectedPromotions: state.selectedPromotions.map((p) =>
            p.promotion.id_promotion === promotionId
              ? { ...p, discount: p.discount + 1 }
              : p
          ),
        };
      } else {
        const promotion = get().getPromotionById(promotionId);

        if (!promotion) {
          console.error("Promotion not found");
          return state;
        }

        return {
          selectedPromotions: [
            ...state.selectedPromotions,
            { promotion, discount: 1 },
          ],
        };
      }
    }),

  // Giảm discount của khuyến mãi đã chọn
  decreasePromotionDiscount: (promotionId) =>
    set((state) => {
      const updatedPromotions = state.selectedPromotions
        .map((p) =>
          p.promotion.id_promotion === promotionId
            ? { ...p, discount: p.discount - 1 }
            : p
        )
        .filter((p) => p.discount > 0);

      return { selectedPromotions: updatedPromotions };
    }),
}));
