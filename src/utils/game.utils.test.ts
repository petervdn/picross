import { getAllPermutationsForRules } from '@/utils/game.utils';

test('Calculating permutations', () => {
  expect(getAllPermutationsForRules({ rules: [1, 2], length: 4 }).length).toBe(1);
  expect(getAllPermutationsForRules({ rules: [1, 2], length: 3 }).length).toBe(0);
  expect(getAllPermutationsForRules({ rules: [9], length: 10 }).length).toBe(2);
});
