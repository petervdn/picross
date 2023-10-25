import { create } from 'zustand';
import {
  BoardItemState,
  BoardPosition,
  BoardPositionKey,
  GameState,
  RowOrColumn,
} from '@/types/misc.types';

type GameStore = GameState & {
  setItemState: (props: {
    boardPosition: BoardPosition;
    itemState: BoardItemState | undefined;
  }) => void;
  getGroup: (
    type: RowOrColumn,
    index: number,
  ) => { items: Array<BoardItemState | undefined>; rules: Array<number> };
};

export const useGameStore = create<GameStore>((set, get) => ({
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
  getGroup: (type, groupIndex) => {
    const { numberOfRows, itemStates, numberOfColumns, rules } = get();
    const rulesForGroup =
      (type === 'column' ? rules.columns[groupIndex] : rules.rows[groupIndex]) ?? [];
    const numberOfItems = type === 'column' ? numberOfRows : numberOfColumns;

    const items = Array.from({ length: numberOfItems }).map(
      (_, index) =>
        itemStates[
          getItemKey(
            type === 'column'
              ? { row: index, column: groupIndex }
              : { row: groupIndex, column: index },
          )
        ],
    );

    return { items, rules: rulesForGroup };
  },
  setItemState: ({ itemState, boardPosition }) =>
    set((state) => ({
      itemStates: { ...state.itemStates, [getItemKey(boardPosition)]: itemState },
    })),
}));

export function getItemKey({ row, column }: BoardPosition): BoardPositionKey {
  return `${row}x${column}`;
}
