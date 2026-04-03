import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Order } from '../types';

interface OrderState {
  selectedOrder: Order | null;
  currentOrderId: number | string | null;
  currentTable: string | number | null;
  lastSessionDate: string;

  setTable: (tableId: string | number) => void;
  setCurrentOrderId: (id: number | string | null) => void;
  checkAndResetSession: () => void;
  setSelectedOrder: (order: Order | null) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      selectedOrder: null,
      currentOrderId: null,
      currentTable: null,
      lastSessionDate: new Date().toDateString(),

      setTable: (tableId) => set({ currentTable: tableId }),

      setCurrentOrderId: (id: any) =>
        set({
          currentOrderId: id,
          lastSessionDate: new Date().toDateString(),
        }),

      checkAndResetSession: () => {
        const { lastSessionDate } = get();
        const today = new Date().toDateString();

        if (lastSessionDate !== today) {
          set({
            currentOrderId: null,
            currentTable: null,
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
        currentOrderId: state.currentOrderId,
        lastSessionDate: state.lastSessionDate,
      }),
    },
  ),
);
