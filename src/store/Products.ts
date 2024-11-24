import { Product } from "@/types/product";
import { create } from "zustand";

interface ProductStore {
  Product: Product[];
  setProduct: (Products: Product[]) => void;
  addProduct: (newProduct: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  getProductById: (id: number) => Product | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  Product: [],
  setProduct: (Product) => set({ Product }),
  addProduct: (newProduct) =>
    set((state) => ({
      Product: [newProduct, ...state.Product],
    })),
  updateProduct: (updatedProduct) =>
    set((state) => ({
      Product: state.Product.map((u) =>
        u.id_product === updatedProduct.id_product ? updatedProduct : u
      ),
    })),
  getProductById: (id) => {
    // Sử dụng get() để lấy trạng thái hiện tại
    return get().Product.find((u) => u.id_product === id);
  },
}));
