export type BoardPosition = {
  row: number;
  column: number;
};

export const boardItemStates = ['filled', 'crossed', 'temporary'] as const;
export type BoardItemState = (typeof boardItemStates)[number];

export type RowOrColumn = 'row' | 'column';

export type RowOrColumnRules = Array<number>;

export type GameDefinition = {
  id: string;
  numberOfRows: number;
  numberOfColumns: number;
  rules: {
    rows: Array<RowOrColumnRules>;
    columns: Array<RowOrColumnRules>;
  };
};

export type BoardState = Record<string, BoardItemState | undefined>;
export type RuleState = 'solved' | 'not-solved' | 'invalid';
