import { RowOrColumn } from '@/types/misc.types';
import { useGameStore } from '@/store/game.store';
import { useMemo } from 'react';
import { filterPermutations, getAllPermutationsForRules, getRowOrColumn } from '@/utils/game.utils';
import { useGameDefinition } from '@/utils/hooks/useGameDefinition';

export function useRowOrColumn({ index, type }: { type: RowOrColumn; index: number }) {
  const { boardState } = useGameStore(({ gameDefinition, boardState }) => ({
    gameDefinition,
    boardState,
  }));

  const gameDefinition = useGameDefinition();

  const rules = useMemo(() => {
    return type === 'column'
      ? gameDefinition.rules.columns[index]
      : gameDefinition.rules.rows[index];
  }, [index, gameDefinition.rules.columns, gameDefinition.rules.rows, type]);

  const allPermutations = useMemo(
    () =>
      getAllPermutationsForRules({
        rules: rules ?? [],
        length: type === 'column' ? gameDefinition.numberOfRows : gameDefinition.numberOfColumns,
      }),
    [gameDefinition.numberOfColumns, gameDefinition.numberOfRows, rules, type],
  );

  // todo: rename (not only items in there)
  const gameBoardItems = useMemo(() => {
    return getRowOrColumn({ boardState, type, index, gameDefinition });
  }, [boardState, gameDefinition, index, type]);

  const permutations = useMemo(() => {
    return filterPermutations(allPermutations ?? [], gameBoardItems.items);
  }, [allPermutations, gameBoardItems.items]);

  const state = useMemo(() => {
    if (permutations?.length === 0) {
      return 'invalid' as const;
    }
    if (permutations?.length === 1) {
      const filledBoardItems = gameBoardItems.items.reduce(
        (sum, item) => sum + (item === 'filled' ? 1 : 0),
        0,
      );
      const necessaryFilledItems = (permutations[0] ?? []).reduce<number>(
        (sum, item) => sum + item,
        0,
      );
      if (filledBoardItems === necessaryFilledItems) {
        return 'solved' as const;
      }
    }
    return 'not-solved' as const;
  }, [gameBoardItems.items, permutations]);

  return { rules: rules, permutations, gameBoardItems, state };
}
