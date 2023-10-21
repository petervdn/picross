import { create } from 'zustand';

type LayoutStore = {
  horizontalRulesWidth: number;
  boardItemSize: number;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  horizontalRulesWidth: 200,
  boardItemSize: 40,
}));
