import { RowOrColumn } from '@/types/misc.types';
import { useGameStore } from '@/store/game.store';
import { useMemo } from 'react';
import { filterPermutations, getPositionsForRules, getRowOrColumn } from '@/utils/game.utils';

export function useRowOrColumn({ index, type }: { type: RowOrColumn; index: number }) {
  const gameState = useGameStore();
  const { numberOfColumns, numberOfRows } = useGameStore(({ numberOfColumns, numberOfRows }) => ({
    numberOfColumns,
    numberOfRows,
  }));

  const rules = useMemo(() => {
    return type === 'column' ? gameState.rules.columns[index] : gameState.rules.rows[index];
  }, [gameState.rules.columns, gameState.rules.rows, index, type]);

  const allPermutations = useMemo(
    () =>
      getPositionsForRules({
        rules: rules ?? [],
        length: type === 'column' ? numberOfColumns : numberOfRows,
      }),
    [numberOfColumns, numberOfRows, rules, type],
  );

  const gameBoardItems = useMemo(() => {
    return getRowOrColumn({ gameState, type, index });
  }, [gameState, index, type]);

  const permutations = useMemo(() => {
    return filterPermutations(allPermutations ?? [], gameBoardItems.items);
  }, [allPermutations, gameBoardItems.items]);

  const state = useMemo(() => {
    if (permutations?.length === 0) {
      return 'invalid' as const;
    }
    if (permutations?.length === 1) {
      return 'solved' as const;
    }
    return 'not-solved' as const;
  }, [permutations]);

  return { rules, permutations, gameBoardItems, state };
}
