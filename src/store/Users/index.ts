import { User } from "@/types/user";
import { create } from "zustand";

    interface UserStore {
        user : User[]
        setUsers : (users : User[]) => void
    }

    export const useUserStore = create<UserStore>((set) =>(
        {
            user : [],
            setUsers : (users: User[]) => set ({user :users})
        }
    ) 
    )