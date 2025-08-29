import { create } from "zustand";

export const categoryStore = create((set) => ({
  categoryList: [],
  setCategoryList: (categoryList) => set({ categoryList }),
}));
