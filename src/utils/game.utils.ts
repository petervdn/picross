import { getItemKey } from '@/store/game.store';
import { BoardItemState, BoardState, GameDefinition, RowOrColumn } from '@/types/misc.types';

// todo: better name
type GroupPosition = {
  ruleIndex: number;
  rule: number;
  position: number;
  children?: Array<GroupPosition>;
};

// todo: better name
function getConfigs({
  rules,
  ruleIndex,
  length,
  start,
}: {
  rules: Array<number>;
  ruleIndex: number;
  length: number;
  start: number;
}): Array<GroupPosition> | undefined {
  const rule = rules[ruleIndex];
  if (rule === undefined) {
    return undefined;
  }

  const end = length - getSpaceForRules(rules.slice(ruleIndex + 1));
  const numberOfPositionsForRule = end - start - rule + 1;

  return Array.from({ length: numberOfPositionsForRule }).map((_, index) => {
    const position = start + index;

    return {
      rule,
      ruleIndex,
      position,
      children: getConfigs({
        ruleIndex: ruleIndex + 1,
        rules,
        length,
        start: position + rule + 1,
      }),
    };
  });
}

/**
 *
 * @param rules
 * @param length
 */
// todo check where this is used and deal with removal of undefined as return value
export function getAllPermutationsForRules({
  rules,
  length,
}: {
  rules: Array<number>;
  length: number;
}): Permutations {
  const results = getConfigs({ rules, length, ruleIndex: 0, start: 0 });

  if (!results) {
    return [];
  }

  const flattened = flattenResults(results);
  return flattened.map((item) => createPermutationFromResult(item, length));
}

// todo: better name
function getNestedResults({
  result: { rule, position, children },
  parents,
  allResults,
}: {
  result: GroupPosition;
  parents?: Array<{ rule: number; position: number }>;
  allResults: Array<Array<{ rule: number; position: number }>>;
}) {
  const currentRuleWithParentRules = [...(parents ?? []), { rule, position }];
  if (children && children.length > 0) {
    children.map((child) =>
      getNestedResults({ result: child, parents: currentRuleWithParentRules, allResults }),
    );
  } else {
    allResults.push(currentRuleWithParentRules);
  }
}

// todo: better name
function flattenResults(results: Array<GroupPosition>) {
  const allResults: Array<Array<{ rule: number; position: number }>> = [];
  for (const result of results) {
    getNestedResults({ result, allResults });
  }

  return allResults;
}

/**
 * todo: better name
 * @param positions
 * @param length
 */
function createPermutationFromResult(
  positions: Array<{ rule: number; position: number }>, // todo: type with good name
  length: number,
): Permutation {
  const array: Array<0 | 1> = Array.from<0 | 1>({ length }).fill(0);

  for (const { position, rule } of positions) {
    array.fill(1, position, position + rule);
  }

  return array;
}

/**
 * Calculates how much room (in board items) a set of rules needs.
 * @param rules
 */
function getSpaceForRules(rules: Array<number>) {
  return rules.reduce((sum, rule) => rule + sum + 1, 0);
}

/**
 * Returns the board item states plus the rules for a given
 * row or column.
 */
export function getRowOrColumn({
  gameDefinition: { numberOfRows, numberOfColumns, rules },
  index,
  type,
  boardState,
}: {
  type: RowOrColumn;
  index: number;
  gameDefinition: GameDefinition;
  boardState: BoardState;
}) {
  const rulesForGroup = (type === 'column' ? rules.columns[index] : rules.rows[index]) ?? [];
  const numberOfItems = type === 'column' ? numberOfRows : numberOfColumns;

  const items = Array.from({ length: numberOfItems }).map(
    (_, mapIndex) =>
      boardState[
        getItemKey(
          type === 'column' ? { row: mapIndex, column: index } : { row: index, column: mapIndex },
        )
      ],
  );

  return { items, rules: rulesForGroup };
}

type Permutation = Array<0 | 1>; // todo: rename -> Solution?
type Permutations = Array<Permutation>;

/**
 * Given a list of permutations for a row/column and a list of
 * board item states (for that same row/colum), this function
 * filters out the permutations that are no longer possible.
 *
 * @param permutations
 * @param rowOrColumnItems
 */
// todo: make params an object
export function filterPermutations(
  permutations: Permutations,
  rowOrColumnItems: Array<BoardItemState | undefined>,
) {
  return permutations.filter((permutation) => {
    for (const [index, rowOrColumnItem] of rowOrColumnItems.entries()) {
      if (rowOrColumnItem === 'filled' && permutation[index] === 0) {
        return false;
      }
      if (rowOrColumnItem === 'crossed' && permutation[index] === 1) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Checks if two board states are equal.
 *
 * @param boardState1
 * @param boardState2
 */
export function boardStatesAreEqual(boardState1: BoardState, boardState2: BoardState): boolean {
  function getKeys(boardState: BoardState) {
    return Object.keys(boardState).filter((key) => boardState[key] !== undefined);
  }
  const keys1 = getKeys(boardState1);
  const keys2 = getKeys(boardState2);

  return (
    keys1.length === keys2.length && keys1.every((key) => boardState1[key] === boardState2[key])
  );
}
