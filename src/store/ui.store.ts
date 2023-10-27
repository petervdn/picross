import { create } from 'zustand';

type UiStore = {
  showPermutations: boolean;
  setShowPermutations: (value: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  showPermutations: false,
  setShowPermutations: (value) => {
    set(() => ({ showPermutations: value }));
  },
}));
