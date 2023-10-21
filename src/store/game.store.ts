import { create } from 'zustand';
import { BoardItemState, BoardPosition } from '@/types/misc.types';

type GroupRules = Array<Array<number>>;

type BoardPositionKey = `${number}x${number}`;

type GameStore = {
  numberOfRows: number;
  numberOfColumns: number;
  rules: {
    rows: GroupRules;
    columns: GroupRules;
  };
  itemStates: Record<BoardPositionKey, BoardItemState>;
  setItemState: (props: { boardPosition: BoardPosition; itemState: BoardItemState }) => void;
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
  itemStates: {},
  setItemState: ({ itemState, boardPosition }) =>
    set((state) => ({
      itemStates: { ...state.itemStates, [getItemKey(boardPosition)]: itemState },
    })),
}));

export function getItemKey({ row, column }: BoardPosition): BoardPositionKey {
  return `${row}x${column}`;
}
