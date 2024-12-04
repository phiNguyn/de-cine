import { Room } from "@/types/room";
import { create } from "zustand";

interface RoomStore {
  Room: Room[];
  setRoom: (Rooms: Room[]) => void;
  addRoom: (newRoom: Room) => void;
  updateRoom: (updatedRoom: Room) => void;
  getRoomById: (id: number) => Room | undefined;
  RooDetail: Room | null; // Sử dụng null hoặc một giá trị mặc định
  setRooDetail: (room: Room) => void; // Thêm phương thức để cập nhật RooDetail
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  Room: [],
  setRoom: (Room) => set({ Room }),
  addRoom: (newRoom) =>
    set((state) => ({
      Room: [...state.Room, newRoom],
    })),
  updateRoom: (updatedRoom) =>
    set((state) => ({
      Room: state.Room.map((u) =>
        u.id_room === updatedRoom.id_room ? updatedRoom : u
      ),
    })),
  getRoomById: (id) => {
    // Sử dụng get() để lấy trạng thái hiện tại
    return get().Room.find((u) => u.id_room === id);
  },
  RooDetail: null, // Khởi tạo giá trị mặc định là null (hoặc là một đối tượng Room tùy vào yêu cầu của bạn)
  setRooDetail: (room) => set({ RooDetail: room }), // Thêm phương thức để cập nhật RooDetail
}));
