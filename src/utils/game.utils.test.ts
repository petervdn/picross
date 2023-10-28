import { boardStatesAreEqual, getAllPermutationsForRules } from '@/utils/game.utils';

test('Calculating permutations', () => {
  expect(getAllPermutationsForRules({ rules: [1, 2], length: 4 }).length).toBe(1);
  expect(getAllPermutationsForRules({ rules: [1, 2], length: 3 }).length).toBe(0);
  expect(getAllPermutationsForRules({ rules: [9], length: 10 }).length).toBe(2);
});

test('Equality of board states', () => {
  expect(boardStatesAreEqual({ a: 'filled' }, { b: 'filled' })).toBe(false);
  expect(boardStatesAreEqual({ a: 'filled' }, { a: 'filled' })).toBe(true);
  expect(boardStatesAreEqual({ a: 'filled', b: 'crossed' }, { b: 'crossed', a: 'filled' })).toBe(
    true,
  );
  expect(boardStatesAreEqual({ a: 'filled', b: undefined }, { a: 'filled' })).toBe(true);
});
