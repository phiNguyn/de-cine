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



interface ShowtimeStore {
  selectedShowDate: string;
  selectedShowTime: string;
  selectedRoomId: number;  // Kiểu là number thay vì string

  setSelectedShowDate: (date: string) => void;
  setSelectedShowTime: (time: string) => void;
  setSelectedRoomId: (roomId: number) => void;  // Phương thức này nhận tham số kiểu number

}

const useShowtimeStore = create<ShowtimeStore>((set) => ({
  selectedShowDate: '',  // Ban đầu là rỗng
  selectedShowTime: '',  // Ban đầu là rỗng
  selectedRoomId: 0,  // Khởi tạo với giá trị số (0 thay vì chuỗi)

  setSelectedShowDate: (date) => set({ selectedShowDate: date }),
  setSelectedShowTime: (time) => set({ selectedShowTime: time }),
  setSelectedRoomId: (roomId) => set({ selectedRoomId: roomId }),  // Phương thức nhận số

}));

export default useShowtimeStore;

interface MovieStore {
  movieName: string;
  movieImage: string;
  setMovie: (name: string, image: string) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movieName: '',
  movieImage: '',
  setMovie: (name, image) => set({ movieName: name, movieImage: image }),
}));