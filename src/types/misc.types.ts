export type GameConfig = {
  rows: BoardGroupConfig;
  columns: BoardGroupConfig;
  groupRules?: Array<number>;
};

type BoardGroupConfig = {
  amount: number;
  rules: Array<Array<number>>;
};

export type Position = {
  x: number;
  y: number;
};

export type BoardItem = {
  position: Position;
  state: 'filled' | 'crossed' | 'temporary';
};

export type GameState = {
  items: Array<BoardItem>;
};
