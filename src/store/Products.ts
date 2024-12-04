import { Product } from "@/types/product";
import { create } from "zustand";

interface SelectedProduct {
  product: Product;
  quantity: number;
}

interface ProductStore {
  Product: Product[];
  selectedProducts: SelectedProduct[];
  setProduct: (Products: Product[]) => void;
  addProduct: (newProduct: Product) => void;
  addProductNew: (newProduct: Product) => void;
  removeProduct: (productId: number) => void;
  updateProduct: (updatedProduct: Product) => void;
  getProductById: (id: number) => Product | undefined;
  decreaseProductQuantity: (productId: number) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  Product: [],
  selectedProducts: [],
  setProduct: (Product) => set({ Product }),
  addProductNew: (newProduct) =>
    set((state) => ({
      Product: [...state.Product, newProduct],
    })),
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
  updateProduct: (updatedProduct) =>
    set((state) => ({
      Product: state.Product.map((u) =>
        u.id_product === updatedProduct.id_product ? updatedProduct : u
      ),
    })),
  getProductById: (id) => {
    return get().Product.find((u) => u.id_product === id);
  },
}));
