import { ShowTimes } from "@/types/showtime";
import { create } from "zustand";

interface ShowTimesStore {
  ShowTimes: ShowTimes[];
  setShowTimes: (ShowTimess: ShowTimes[]) => void;
  addShowTimes: (newShowTimes: ShowTimes) => void;
  updateShowTimes: (updatedShowTimes: ShowTimes) => void;
  getShowTimesById: (id: number) => ShowTimes | undefined;
  RooDetail: ShowTimes | null; // Sử dụng null hoặc một giá trị mặc định
  setRooDetail: (ShowTimes: ShowTimes) => void; // Thêm phương thức để cập nhật RooDetail
}

export const useShowTimesStore = create<ShowTimesStore>((set, get) => ({
  ShowTimes: [],
  setShowTimes: (ShowTimes) => set({ ShowTimes }),
  addShowTimes: (newShowTimes) =>
    set((state) => ({
      ShowTimes: [...state.ShowTimes, newShowTimes],
    })),
  updateShowTimes: (updatedShowTimes) =>
    set((state) => ({
      ShowTimes: state.ShowTimes.map((u) =>
        u.id_showtime === updatedShowTimes.id_showtime ? updatedShowTimes : u
      ),
    })),
  getShowTimesById: (id) => {
    // Sử dụng get() để lấy trạng thái hiện tại
    return get().ShowTimes.find((u) => u.id_showtime === id);
  },
  RooDetail: null, // Khởi tạo giá trị mặc định là null (hoặc là một đối tượng ShowTimes tùy vào yêu cầu của bạn)
  setRooDetail: (ShowTimes) => set({ RooDetail: ShowTimes }), // Thêm phương thức để cập nhật RooDetail
}));
