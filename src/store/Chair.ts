import { Chair } from "@/types/chair";
import { create } from "zustand";

interface ChairStore {
  Chair: Chair[];
  setChair: (Chairs: Chair[]) => void;
  addChair: (newChair: Chair) => void;
  updateChair: (updatedChair: Chair) => void;
  getChairById: (id: number) => Chair | undefined;
}

export const useChairStore = create<ChairStore>((set, get) => ({
  Chair: [],
  setChair: (Chair) => set({ Chair }),
  addChair: (newChair) =>
    set((state) => ({
      Chair: [...state.Chair, newChair],
    })),
  updateChair: (updatedChair) =>
    set((state) => ({
      Chair: state.Chair.map((u) =>
        u.id_chair === updatedChair.id_chair ? updatedChair : u
      ),
    })),
  getChairById: (id) => {
    // Sử dụng get() để lấy trạng thái hiện tại
    return get().Chair.find((u) => u.id_chair === id);
  }
}));
