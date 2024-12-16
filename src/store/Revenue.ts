import { GetRevenueFilter } from "@/apis/revenue";
import { create } from "zustand";

interface RevenueStore {
  filters?: GetRevenueFilter;
  setFilters: (filters: GetRevenueFilter) => void;
}

export const useRevenueStore = create<RevenueStore>((set) => ({
  filters: undefined,
  setFilters: (filters) => set({ filters }),
}));
