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
  boardState: {},
  setItemState: ({ itemState, boardPosition }) =>
    set((state) => ({
      boardState: { ...state.boardState, [getItemKey(boardPosition)]: itemState },
    })),
  setGameDefinition: (gameDefinition) => {
    set(() => ({ gameDefinition, boardState: {} }));
  },
}));

export function getItemKey({ row, column }: BoardPosition): BoardPositionKey {
  return `${column}x${row}`;
}
