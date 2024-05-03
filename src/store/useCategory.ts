import { create } from 'zustand';

interface CategoryState {
  baseCategoryInfo: Category[] | undefined;
  setbaseCategoryInfo: (categories: Category[]) => void;
}

export const useCategory = create<CategoryState>()((set) => ({
  baseCategoryInfo: [],
  setbaseCategoryInfo: (categories: Category[]) =>
    set(() => ({ baseCategoryInfo: categories })),
}));
