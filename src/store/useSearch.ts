import { create } from 'zustand';

interface SearchState {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export const useSearch = create<SearchState>()((set) => ({
  searchText: '',
  setSearchText: (searchText: string) => set(() => ({ searchText })),
}));
