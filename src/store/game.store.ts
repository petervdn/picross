import { create } from 'zustand';

type GroupRules = Array<Array<number>>;

type GameStore = {
  numberOfRows: number;
  numberOfColumns: number;
  rules: {
    rows: GroupRules;
    columns: GroupRules;
  };
};

export const useGameStore = create<GameStore>((set) => ({
  numberOfColumns: 10,
  numberOfRows: 10,
  rules: {
    rows: [
      [1, 2],
      [2, 3],
    ],
    columns: [[1, 2], [], [], [2, 3, 5, 6]],
  },
}));
