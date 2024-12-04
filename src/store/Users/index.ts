import { User } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  user: User[];
  setUser: (users: User[]) => void;
  addUser: (newUser: User) => void;
  updateUser: (updatedUser: User) => void;
  UserDetail: User | null;
  getUserById: (id: number) => User | undefined;
}

export const useUser = create<UserStore>((set, get) => ({
  user: [],
  setUser: (user) => set({ user }),
  addUser: (newUser) =>
    set((state) => ({
      user: [...state.user, newUser],
    })),
  updateUser: (updatedUser) =>
    set((state) => ({
      user: state.user.map((u) =>
        u.id_account === updatedUser.id_account ? updatedUser : u
      ),
    })),
  UserDetail: null,
  getUserById: (id) => {
    // Sử dụng get() để lấy trạng thái hiện tại
    return get().user.find((u) => u.id_account === id);
  },
}));
