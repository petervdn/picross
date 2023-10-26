import { create } from 'zustand';
import {
  BoardItemState,
  BoardPosition,
  BoardPositionKey,
  BoardState,
  GameDefinition,
} from '@/types/misc.types';

type GameStore = {
  setItemState: (props: {
    boardPosition: BoardPosition;
    itemState: BoardItemState | undefined;
  }) => void;
  gameDefinition: GameDefinition | undefined;
  boardState: BoardState;
  setGameDefinition: (gameDefinition: GameDefinition | undefined) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  gameDefinition: undefined,
  // numberOfColumns: 10,
  // numberOfRows: 10,
  // rules: {
  //   rows: [
  //     [2, 4],
  //     [9],
  //     [2, 1, 3],
  //     [1, 1, 2],
  //     [1, 1, 2],
  //     [2, 3],
  //     [1, 4, 1],
  //     [2, 3, 1],
  //     [2, 1, 2],
  //     [1, 1, 2],
  //   ],
  //   columns: [
  //     [1, 1],
  //     [4, 3],
  //     [3, 1, 1],
  //     [2, 3, 1, 1],
  //     [2, 2],
  //     [2, 4],
  //     [2, 2, 1],
  //     [3, 2],
  //     [6, 2],
  //     [4, 1, 1],
  //   ],
  // },
  boardState: {},
  setItemState: ({ itemState, boardPosition }) =>
    set((state) => ({
      boardState: { ...state.boardState, [getItemKey(boardPosition)]: itemState },
    })),
  setGameDefinition: (gameDefinition) => {
    set(() => ({ gameDefinition }));
  },
}));

export function getItemKey({ row, column }: BoardPosition): BoardPositionKey {
  return `${column}x${row}`;
}
