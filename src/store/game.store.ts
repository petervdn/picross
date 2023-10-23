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
  itemStates: Record<BoardPositionKey, BoardItemState | undefined>;
  setItemState: (props: {
    boardPosition: BoardPosition;
    itemState: BoardItemState | undefined;
  }) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  numberOfColumns: 10,
  numberOfRows: 10,
  rules: {
    rows: [
      [2, 4],
      [9],
      [2, 1, 3],
      [1, 1, 2],
      [1, 1, 2],
      [2, 3],
      [1, 4, 1],
      [2, 3, 1],
      [2, 1, 2],
      [1, 1, 2],
    ],
    columns: [
      [1, 1],
      [4, 3],
      [3, 1, 1],
      [2, 3, 1, 1],
      [2, 2],
      [2, 4],
      [2, 2, 1],
      [3, 2],
      [6, 2],
      [4, 1, 1],
    ],
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
