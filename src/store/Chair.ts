import { Chair } from "@/types/chair";
import { create } from "zustand";

interface ChairStore {
  Chair: Chair[];
  setChair: (Chairs: Chair[]) => void;
  addChair: (newChair: Chair) => void;
  updateChair: (updatedChair: Chair) => void;
  getChairById: (id: number) => Chair | undefined;

  // Thêm trạng thái và hành động mới
  selectedSeats: Chair[];
  addSelectedSeat: (seat: Chair) => void;
  removeSelectedSeat: (id: number) => void;
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
    return get().Chair.find((u) => u.id_chair === id);
  },

  // Khởi tạo trạng thái và hành động mới
  selectedSeats: [],
  addSelectedSeat: (seat) =>
    set((state) => ({
      selectedSeats: [...state.selectedSeats, seat],
    })),
  removeSelectedSeat: (id) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.filter((seat) => seat.id_chair !== id),
    })),
}));
