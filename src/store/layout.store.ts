import { create } from 'zustand';

type LayoutStore = {
  horizontalRulesWidth: number;
  boardItemSize: number;
  boardItemMargin: number;
};

// todo: move to css variables

export const useLayoutStore = create<LayoutStore>((set) => ({
  horizontalRulesWidth: 200,
  boardItemSize: 40,
  boardItemMargin: 4,
}));
