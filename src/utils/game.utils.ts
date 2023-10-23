import { GameConfig } from '@/types/misc.types';

export function getMaxAmountOfRules(gameConfig: GameConfig) {
  return {
    horizontal: gameConfig.rows.rules.reduce((acc, rules) => {
      return Math.max(acc, rules.length);
    }, 0),
    vertical: gameConfig.columns.rules.reduce((acc, rules) => {
      return Math.max(acc, rules.length);
    }, 0),
  };
}

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
}): Array<GroupPosition> {
  const rule = rules[ruleIndex];
  if (rule === undefined) {
    return [];
  }

  const end = length - getSpaceForRules(rules.slice(ruleIndex + 1)) - 1;
  const fullLength = end - start + 1;

  return Array.from({ length: fullLength - (rule - 1) }).map((_, index) => {
    const position = start + index;
    const children = getConfigs({
      ruleIndex: ruleIndex + 1,
      rules,
      length,
      start: position + rule + 1,
    });
    return {
      rule,
      ruleIndex,
      position,
      children: children.length > 0 ? children : undefined,
    };
  });
}

export function getPositionsForRules({ rules, length }: { rules: Array<number>; length: number }) {
  const results = getConfigs({ rules, length, ruleIndex: 0, start: 0 });
  const flattened = flattenResults(results);
  return flattened.map((item) => createArrayFromResult(item, length));
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
