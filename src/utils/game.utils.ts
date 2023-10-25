import { getItemKey } from '@/store/game.store';
import { BoardItemState, GameState, RowOrColumn } from '@/types/misc.types';

type GroupPosition = {
  ruleIndex: number;
  rule: number;
  position: number;
  children?: Array<GroupPosition>;
};

export function getConfigs({
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

export function getPositionsForRules({
  rules,
  length,
}: {
  rules: Array<number>;
  length: number;
}): Permutations | undefined {
  const results = getConfigs({ rules, length, ruleIndex: 0, start: 0 });

  if (results) {
    const flattened = flattenResults(results);
    return flattened.map((item) => createArrayFromResult(item, length));
  }
}

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

function flattenResults(results: Array<GroupPosition>) {
  const allResults: Array<Array<{ rule: number; position: number }>> = [];
  for (const result of results) {
    getNestedResults({ result, allResults });
  }

  return allResults;
}

function createArrayFromResult(
  positions: Array<{ rule: number; position: number }>,
  length: number,
): Array<0 | 1> {
  const array: Array<0 | 1> = Array.from<0 | 1>({ length }).fill(0);

  for (const { position, rule } of positions) {
    array.fill(1, position, position + rule);
  }

  return array;
}

function getSpaceForRules(rules: Array<number>) {
  return rules.reduce((sum, rule) => rule + sum + 1, 0);
}

/**
 * Returns an array with states for one ror or column.
 */
export function getRowOrColumn({
  gameState: { numberOfRows, itemStates, numberOfColumns, rules },
  index,
  type,
}: {
  type: RowOrColumn;
  index: number;
  gameState: GameState;
}) {
  const rulesForGroup = (type === 'column' ? rules.columns[index] : rules.rows[index]) ?? [];
  const numberOfItems = type === 'column' ? numberOfRows : numberOfColumns;

  const items = Array.from({ length: numberOfItems }).map(
    (_, mapIndex) =>
      itemStates[
        getItemKey(
          type === 'column' ? { row: mapIndex, column: index } : { row: index, column: mapIndex },
        )
      ],
  );

  return { items, rules: rulesForGroup };
}

type Permutations = Array<Array<0 | 1>>;

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
