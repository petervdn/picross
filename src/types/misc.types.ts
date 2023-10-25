export type BoardPosition = {
  row: number;
  column: number;
};

export const boardItemStates = ['filled', 'crossed', 'temporary'] as const;
export type BoardItemState = (typeof boardItemStates)[number];

export type RowOrColumn = 'row' | 'column';

export type RowOrColumnRules = Array<number>;
export type GameState = {
  numberOfRows: number;
  numberOfColumns: number;
  rules: {
    rows: Array<RowOrColumnRules>;
    columns: Array<RowOrColumnRules>;
  };
  itemStates: Record<BoardPositionKey, BoardItemState | undefined>;
};
export type BoardPositionKey = `${number}x${number}`;
