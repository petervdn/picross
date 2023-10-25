import { RowOrColumn } from '@/types/misc.types';
import { useGameStore } from '@/store/game.store';
import { useMemo } from 'react';
import { getPositionsForRules } from '@/utils/game.utils';

export function useRowOrColumn({ index, type }: { type: RowOrColumn; index: number }) {
  const allRules = useGameStore(({ rules }) => rules);
  const { numberOfColumns, numberOfRows } = useGameStore(({ numberOfColumns, numberOfRows }) => ({
    numberOfColumns,
    numberOfRows,
  }));

  const rules = useMemo(() => {
    return type === 'column' ? allRules.columns[index] : allRules.rows[index];
  }, [allRules.columns, allRules.rows, index, type]);

  const permutations = useMemo(
    () =>
      getPositionsForRules({
        rules: rules ?? [],
        length: type === 'column' ? numberOfColumns : numberOfRows,
      }),
    [numberOfColumns, numberOfRows, rules, type],
  );

  return { rules, permutations };
}
