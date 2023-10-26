import { GameDefinition } from '@/types/misc.types';

export const gameDefinitions: Array<GameDefinition> = [
  {
    id: 'p052',
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
  {
    id: 'p001',
    numberOfColumns: 5,
    numberOfRows: 5,
    rules: {
      rows: [[3], [1], [1, 1], [1, 1, 1], [1, 1]],
      columns: [[1], [1, 1, 1], [2, 1], [1, 1, 1], [1]],
    },
  },
  {
    id: 'p002',
    numberOfColumns: 5,
    numberOfRows: 5,
    rules: {
      rows: [[3], [3], [3], [4], [5]],
      columns: [[3], [3], [3], [4], [3, 1]],
    },
  },
  {
    id: 'p003',
    numberOfColumns: 5,
    numberOfRows: 5,
    rules: {
      rows: [[1, 2], [3], [3], [3], [4]],
      columns: [[1, 1], [4], [5], [2, 2], [1]],
    },
  },
  {
    id: 'p004',
    numberOfColumns: 10,
    numberOfRows: 10,
    rules: {
      rows: [
        [10],
        [4, 3],
        [3, 3, 2],
        [2, 3, 2],
        [1, 7],
        [1, 1, 2],
        [5],
        [1, 1, 4],
        [1, 1, 1, 2],
        [3, 1],
      ],
      columns: [[3], [5], [4, 2], [2, 2, 1], [1, 3, 3], [1, 5, 1], [1, 3, 3], [2, 1, 2], [9], [10]],
    },
  },
];
