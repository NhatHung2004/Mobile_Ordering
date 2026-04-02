import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Order } from '../types';

interface OrderState {
  selectedOrder: Order | null;
  orderHistory: Order[];
  currentTable: string | number | null;
  lastSessionDate: string;

  setTable: (tableId: string | number) => void;
  addOrder: (order: Order) => void;
  checkAndResetSession: () => void;
  setSelectedOrder: (order: Order | null) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      selectedOrder: null,
      orderHistory: [],
      currentTable: null,
      lastSessionDate: new Date().toDateString(),

      setTable: (tableId) => set({ currentTable: tableId }),

      addOrder: (order) =>
        set((state) => ({
          orderHistory: [order, ...state.orderHistory],
          lastSessionDate: new Date().toDateString(),
        })),

      checkAndResetSession: () => {
        const { lastSessionDate } = get();
        const today = new Date().toDateString();

        if (lastSessionDate !== today) {
          set({
            orderHistory: [],
            lastSessionDate: today,
          });
        }
      },

      setSelectedOrder: (order) => set({ selectedOrder: order }),
    }),
    {
      name: 'restaurant-order-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        orderHistory: state.orderHistory,
        lastSessionDate: state.lastSessionDate,
      }),
    },
  ),
);
