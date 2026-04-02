import { create } from 'zustand';
import { fetchMenuItems } from '../service/menu';
import { fetchCategories } from '../service/category';

interface MenuState {
  selectedItem: any;
  menuItems: any[];
  categories: any[];
  isLoading: boolean;
  error: string | null;

  loadMenuData: () => Promise<void>;
  setSelectedItem: (item: any) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  selectedItem: null,
  menuItems: [],
  categories: [],
  isLoading: false,
  error: null,

  loadMenuData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [categories, menuItems] = (await Promise.all([
        fetchCategories(),
        fetchMenuItems(),
      ])) as [any[], any[]];
      set({ categories, menuItems, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  setSelectedItem: (item: any) => set({ selectedItem: item }),
}));
