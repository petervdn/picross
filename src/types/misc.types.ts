export type GameConfig = {
  rows: BoardGroupConfig;
  columns: BoardGroupConfig;
  groupRules?: Array<number>;
};

type BoardGroupConfig = {
  amount: number;
  rules: Array<Array<number>>;
};

export type BoardPosition = {
  row: number;
  column: number;
};

export type Position = {
  x: number;
  y: number;
};

export const boardItemStates = ['filled', 'crossed', 'temporary'] as const;
export type BoardItemState = (typeof boardItemStates)[number];

// export type BoardItem = {
//   position: Position;
//   state: BoardItemState;
// };
//
// export type GameState = {
//   items: Array<BoardItem>;
// };
