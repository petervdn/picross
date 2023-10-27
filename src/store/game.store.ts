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
  setBoardState: (boardState: BoardState) => void;
  setGameDefinition: (gameDefinition: GameDefinition | undefined) => void; // todo: validate game (number of rules)
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
  setBoardState: (boardState) => {
    set(() => ({ boardState }));
  },
}));

// todo: clearer name + move
export function getItemKey({ row, column }: BoardPosition): BoardPositionKey {
  return `${column}x${row}`;
}
