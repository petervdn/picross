import { GameDefinition } from '@/types/misc.types';

export const gameDefinitions: Array<GameDefinition> = [
  {
    id: 'P052',
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
  },
];
