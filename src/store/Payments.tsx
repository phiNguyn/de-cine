export interface Payment {
    id_payment: number
    name: string,
    created_at: Date,
    update_at: Date
}

import { create } from "zustand";

interface PaymentStore {
    Payment: Payment[];
    setPayment: (Payments: Payment[]) => void;
    getPaymentById: (id: number) => Payment | undefined;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
    Payment: [],
    setPayment: (Payment) => set({ Payment }),

    getPaymentById: (id) => {
        // Sử dụng get() để lấy trạng thái hiện tại
        return get().Payment.find((u) => u.id_payment === id);
    },

}));
