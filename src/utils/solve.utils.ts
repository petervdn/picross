import {
  boardStatesAreEqual,
  filterPermutations,
  getAllPermutationsForRules,
  getRowOrColumn,
} from '@/utils/game.utils';
import { BoardState, GameDefinition, RowOrColumn } from '@/types/misc.types';
import { getItemKey } from '@/store/game.store';

/**
 * Represents a row or column, with 0 or 1 indicating places
 * that are guaranteed to be filled (1) or excluded (0).
 */
type GuaranteedStates = Array<0 | 1 | undefined>;

// todo add description
export function applyGuaranteedStates({
  type,
  guaranteedStates,
  boardState,
}: {
  boardState: BoardState;
  type: RowOrColumn;
  guaranteedStates: Array<GuaranteedStates>;
}) {
  const newBoardState: BoardState = { ...boardState };
  for (const [rowOrColumnIndex, states] of guaranteedStates.entries()) {
    for (const [stateIndex, state] of states.entries()) {
      if (state !== undefined) {
        const key = getItemKey({
          row: type === 'row' ? rowOrColumnIndex : stateIndex,
          column: type === 'column' ? rowOrColumnIndex : stateIndex,
        });
        newBoardState[key] = state === 1 ? 'filled' : 'crossed';
      }
    }
  }

  return newBoardState;
}

export function findGuaranteedBoardItemStatesForRowsOrColumns({
  gameDefinition,
  boardState,
  type,
}: {
  gameDefinition: GameDefinition;
  boardState: BoardState;
  type: RowOrColumn;
}): Array<GuaranteedStates> {
  const length = type == 'row' ? gameDefinition.numberOfRows : gameDefinition.numberOfColumns;
  const results: Array<GuaranteedStates> = [];
  for (let index = 0; index < length; index++) {
    results.push(
      findGuaranteedBoardItemStatesForRowOrColumn({ gameDefinition, boardState, type, index }),
    );
  }

  return results;
}

/**
 * For a given row or colum, returns a list of positions in that row/column
 * that are always filled (value=1), always excluded (value=0) or uncertain
 * (value=undefined).
 *
 * @param gameDefinition
 * @param boardState
 * @param type
 * @param index
 */
export function findGuaranteedBoardItemStatesForRowOrColumn({
  gameDefinition,
  boardState,
  type,
  index,
}: {
  gameDefinition: GameDefinition;
  boardState: BoardState;
  type: RowOrColumn;
  index: number;
  // todo: unify 'filled' 'excluded' values with the 0 and 1 we use here
}): GuaranteedStates {
  const rowOrColumn = getRowOrColumn({ gameDefinition, type, boardState, index });

  const permutations = getAllPermutationsForRules({
    rules: rowOrColumn.rules,
    length: type === 'column' ? gameDefinition.numberOfRows : gameDefinition.numberOfColumns,
  });

  const filteredPermutations = filterPermutations(permutations, rowOrColumn.items);
  const alwaysFilled = Array.from<1 | undefined>({ length: rowOrColumn.items.length }).fill(1);
  const alwaysExcluded = Array.from<0 | undefined>({ length: rowOrColumn.items.length }).fill(0);

  for (const permutation of filteredPermutations) {
    for (const [permutationValueIndex, permutationValue] of permutation.entries()) {
      if (permutationValue === 0) {
        alwaysFilled[permutationValueIndex] = undefined;
      }
      if (permutationValue === 1) {
        alwaysExcluded[permutationValueIndex] = undefined;
      }
    }
  }

  // merge alwaysFilled and alwaysExcluded arrays
  return alwaysFilled.map((entry, index) => {
    return alwaysExcluded[index] === 0 ? 0 : entry;
  });
}

/**
 * Does two calls to findGuaranteedBoardItemStatesForRowsOrColumns,
 * one for rows and one for the columns.
 * @param gameDefinition
 * @param boardState
 * @param type
 */
// todo rename
export function setGuaranteedBoardItemStates({
  gameDefinition,
  boardState,
  startWith = 'row',
}: {
  gameDefinition: GameDefinition;
  boardState: BoardState;
  startWith?: RowOrColumn;
}): BoardState {
  const newBoardState = applyGuaranteedStates({
    guaranteedStates: findGuaranteedBoardItemStatesForRowsOrColumns({
      type: startWith,
      boardState,
      gameDefinition,
    }),
    boardState,
    type: startWith,
  });

  const type = startWith === 'row' ? 'column' : 'row';
  return applyGuaranteedStates({
    guaranteedStates: findGuaranteedBoardItemStatesForRowsOrColumns({
      type,
      boardState: newBoardState,
      gameDefinition,
    }),
    boardState: newBoardState,
    type,
  });
}

export function findGuaranteedStatesUntilNoChanges({
  boardState,
  gameDefinition,
}: {
  gameDefinition: GameDefinition;
  boardState: BoardState;
}) {
  let numberOfIterations = 0;
  let currentBoardState: BoardState = boardState;
  let newBoardState: BoardState | undefined = undefined;
  do {
    numberOfIterations++;
    if (newBoardState !== undefined) {
      currentBoardState = newBoardState;
    }
    newBoardState = setGuaranteedBoardItemStates({
      gameDefinition,
      boardState: currentBoardState,
    });
  } while (
    newBoardState !== undefined &&
    !boardStatesAreEqual(currentBoardState, newBoardState) &&
    numberOfIterations < 1000
  );

  return { boardState: newBoardState, numberOfIterations };
}

export function solve({
  gameDefinition,
  boardState,
}: {
  gameDefinition: GameDefinition;
  boardState: BoardState;
}) {}
